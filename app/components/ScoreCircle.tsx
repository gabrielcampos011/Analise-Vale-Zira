"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreCircleProps {
  score: number;
  label: string;
  delay?: number;
}

function scoreColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f97316";
  return "#ef4444";
}

export default function ScoreCircle({ score, label, delay = 0 }: ScoreCircleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const color = scoreColor(score);

  useEffect(() => {
    let fallbackTimer: ReturnType<typeof setTimeout>;
    let delayTimer: ReturnType<typeof setTimeout>;

    const trigger = () => {
      delayTimer = setTimeout(() => setAnimated(true), delay);
    };

    // Fallback garante que sempre anima, mesmo sem IntersectionObserver
    fallbackTimer = setTimeout(trigger, delay + 600);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer);
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(delayTimer);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!animated) return;
    let start: number | null = null;
    const duration = 900;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayed(Math.round(progress * score));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [animated, score]);

  const dashOffset = animated
    ? circumference * (1 - score / 100)
    : circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div
        style={{
          position: "relative",
          filter: animated ? `drop-shadow(0 0 10px ${color}66)` : "none",
          transition: "filter 0.6s ease",
        }}
      >
        <svg width="96" height="96" viewBox="0 0 96 96">
          {/* trilha de fundo */}
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke="#1e1e1e"
            strokeWidth="8"
          />
          {/* arco animado */}
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 48 48)"
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: 700,
            fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
            color,
          }}
        >
          {displayed}
        </span>
      </div>
      <span
        style={{
          fontSize: "0.75rem",
          textAlign: "center",
          lineHeight: 1.3,
          color: "var(--text-muted)",
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}
