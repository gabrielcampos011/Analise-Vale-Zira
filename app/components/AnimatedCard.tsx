"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface AnimatedCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  delay?: number;
}

export default function AnimatedCard({
  Icon,
  title,
  description,
  badge,
  delay = 0,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fallbackTimer: ReturnType<typeof setTimeout>;
    let delayTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      delayTimer = setTimeout(() => setVisible(true), delay);
    };

    // Garante visibilidade mesmo sem observer
    fallbackTimer = setTimeout(show, delay + 500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer);
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(delayTimer);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={visible ? "card-visible" : "card-hidden"}
      style={{
        background: "var(--bg-card)",
        borderLeft: `3px solid ${hovered ? "#ef4444" : "#dc2626"}`,
        boxShadow: hovered ? "0 0 28px #dc262620" : "none",
        transform: hovered && visible ? "translateY(-3px)" : undefined,
        transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
        padding: "1.5rem",
        borderRadius: "0.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div
          style={{
            flexShrink: 0,
            padding: "0.5rem",
            borderRadius: "0.375rem",
            background: "#1a0000",
          }}
        >
          <Icon size={20} color="#dc2626" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "0.375rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne), 'Syne', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "var(--text-primary)",
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.7rem",
                padding: "0.15rem 0.6rem",
                borderRadius: "9999px",
                background: "#1a0000",
                color: "#dc2626",
                border: "1px solid #3d0000",
              }}
            >
              {badge}
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
