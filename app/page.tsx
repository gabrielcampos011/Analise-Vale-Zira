"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Settings2,
  ShieldCheck,
  Lock,
  TrendingUp,
  RefreshCw,
  Palette,
  Globe,
  ArrowUp,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import ScoreCircle from "./components/ScoreCircle";
import AnimatedCard from "./components/AnimatedCard";

// ─── Dados ──────────────────────────────────────────────────────────────────

const BEFORE_DESKTOP = [
  { score: 70, label: "Desempenho" },
  { score: 92, label: "Acessibilidade" },
  { score: 73, label: "Práticas Rec." },
  { score: 92, label: "SEO" },
];

const AFTER_DESKTOP = [
  { score: 90, label: "Desempenho" },
  { score: 92, label: "Acessibilidade" },
  { score: 100, label: "Práticas Rec." },
  { score: 100, label: "SEO" },
];

const SUMMARY = [
  { label: "Desempenho Desktop",  value: "90",  sub: "era 70",  color: "#22c55e" },
  { label: "SEO Desktop",         value: "100", sub: "era 92",  color: "#22c55e" },
  { label: "Práticas Rec.",       value: "100", sub: "era 73",  color: "#22c55e" },
  { label: "Melhorias Aplicadas", value: "6",   sub: "itens",   color: "#dc2626" },
];

const GAINS = [
  { label: "Desempenho Desktop",    delta: "+20 pts", color: "#22c55e" },
  { label: "Práticas Recomendadas", delta: "+27 pts", color: "#22c55e" },
  { label: "SEO Desktop",           delta: "+8 pts",  color: "#22c55e" },
  { label: "Acessibilidade",        delta: "Mantida", color: "#f97316" },
];

const IMPROVEMENTS = [
  {
    Icon: Settings2,
    title: "Elementor Pro",
    description:
      "Ativação do construtor visual profissional com widgets premium e otimização de carregamento por elemento — mais controle sobre performance e design sem comprometer a velocidade.",
    badge: "Performance",
  },
  {
    Icon: RefreshCw,
    title: "Atualização de Plugins",
    description:
      "Todos os plugins atualizados para as versões mais recentes e os inativos removidos. Menos código = menos vetores de ataque, menos requisições e tempo de carregamento reduzido.",
    badge: "Manutenção",
  },
  {
    Icon: Palette,
    title: "Limpeza de Temas",
    description:
      "Temas inativos excluídos e tema principal atualizado. Temas abandonados são das principais brechas de segurança em WordPress — a limpeza reduz o risco diretamente.",
    badge: "Segurança",
  },
  {
    Icon: ShieldCheck,
    title: "Wordfence Security",
    description:
      "Firewall de aplicação web (WAF) e scanner de malware configurados. Bloqueia tentativas de invasão em tempo real, monitora o tráfego e alerta sobre arquivos modificados.",
    badge: "Segurança",
  },
  {
    Icon: Lock,
    title: "WP Armour",
    description:
      "Proteção contra spam em formulários via honeypot invisível. Elimina envios de bots sem CAPTCHA, preservando a experiência do visitante e mantendo a caixa de entrada limpa.",
    badge: "Segurança",
  },
  {
    Icon: TrendingUp,
    title: "Yoast SEO",
    description:
      "Configuração completa e otimização de metadados em todas as páginas. Cada página passou a ter título, descrição e estrutura corretos para aparecer melhor no Google.",
    badge: "SEO",
  },
];

// ─── Fontes (atalhos) ────────────────────────────────────────────────────────

const F_DISPLAY = "var(--font-syne), 'Syne', sans-serif";
const F_BODY    = "var(--font-dm-sans), 'DM Sans', sans-serif";
const F_MONO    = "var(--font-dm-mono), 'DM Mono', monospace";

// ─── Sub-componentes inline ──────────────────────────────────────────────────

function ScoreBlock({
  title,
  scores,
  variant,
}: {
  title: string;
  scores: { score: number; label: string }[];
  variant: "before" | "after";
}) {
  const [hovered, setHovered] = useState(false);
  const borderColor =
    variant === "after"
      ? hovered ? "#16a34a" : "#22c55e33"
      : hovered ? "#d97706" : "#f9731633";
  const shadow =
    variant === "after"
      ? hovered ? "0 8px 32px #22c55e14" : "none"
      : hovered ? "0 8px 32px #f9731614" : "none";
  const labelColor = variant === "after" ? "#22c55e" : "#f97316";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${borderColor}`,
        borderRadius: "0.75rem",
        padding: "2rem",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: shadow,
        transition: "all 0.3s ease",
      }}
    >
      <h3
        style={{
          fontFamily: F_DISPLAY,
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: labelColor,
          marginBottom: "1.5rem",
        }}
      >
        {title}
      </h3>
      <div className="score-grid">
        {scores.map((item, i) => (
          <ScoreCircle
            key={item.label}
            score={item.score}
            label={item.label}
            delay={i * 150}
          />
        ))}
      </div>
    </div>
  );
}

function GainCard({
  label,
  delta,
  color,
}: {
  label: string;
  delta: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? color : color + "33"}`,
        borderRadius: "0.5rem",
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 6px 24px ${color}18` : "none",
        transition: "all 0.3s ease",
      }}
    >
      <span style={{ fontFamily: F_BODY, fontSize: "0.875rem", color: "var(--text-muted)" }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: F_MONO,
          fontSize: "0.95rem",
          fontWeight: 700,
          color,
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          whiteSpace: "nowrap",
        }}
      >
        <ArrowUp size={13} />
        {delta}
      </span>
    </div>
  );
}

// ─── Página ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", fontFamily: F_BODY }}>

      {/* ── Header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Globe size={17} color="#dc2626" />
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>
            Go&amp;Grow
          </span>
        </div>
        <span
          style={{
            fontFamily: F_MONO,
            fontSize: "0.7rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            background: "#1a0000",
            color: "#dc2626",
            border: "1px solid #3d0000",
          }}
        >
          Relatório de Otimização
        </span>
      </header>

      {/* ── Hero ── */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          textAlign: "center",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(61,0,0,0.55) 0%, transparent 70%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 50% 40% at 50% 110%, rgba(220,38,38,0.07) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: "48rem", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              marginBottom: "2rem",
              background: "#1a0000",
              border: "1px solid #3d0000",
              color: "#dc2626",
              fontFamily: F_MONO,
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#dc2626",
                animation: "pulse 2s infinite",
                display: "inline-block",
              }}
            />
            valezira.com.br
          </div>

          <h1
            style={{
              fontFamily: F_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 7vw, 4rem)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: "0 0 1rem",
            }}
          >
            Otimização<br />
            <span style={{ color: "#dc2626" }}>Vale Zirá</span>
          </h1>

          <p style={{ fontFamily: F_BODY, fontSize: "1rem", color: "var(--text-muted)", margin: "0 0 0.5rem" }}>
            Análise e implementação de melhorias de performance, segurança e SEO
          </p>
          <p style={{ fontFamily: F_MONO, fontSize: "0.8rem", color: "#3a3a3a" }}>
            Relatório · 14 de maio de 2026
          </p>
        </div>
      </section>

      {/* ── Barra de Resumo ── */}
      <section className="summary-section" style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div className="summary-grid">
          {SUMMARY.map((item) => (
            <div key={item.label} className="summary-card">
              <div className="summary-value" style={{ fontFamily: F_MONO, color: item.color }}>
                {item.value}
              </div>
              <div className="summary-label" style={{ fontFamily: F_DISPLAY }}>
                {item.label}
              </div>
              <div className="summary-sub" style={{ fontFamily: F_MONO }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="main-wrap">

        {/* ══ ATO 1 ══ Cenário Inicial ══════════════════════════════════════ */}
        <section className="section-spacing">
          <span style={{ fontFamily: F_MONO, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dc2626" }}>
            Ato 1
          </span>
          <h2 style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--text-primary)", margin: "0.375rem 0 0.75rem" }}>
            Cenário Inicial
          </h2>
          <p style={{ fontFamily: F_BODY, fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "40rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Antes das otimizações, o site apresentava desempenho comprometido e configurações
            desatualizadas que impactavam diretamente a experiência do visitante e o
            posicionamento orgânico no Google.
          </p>

          <ScoreBlock title="Desktop — Antes" scores={BEFORE_DESKTOP} variant="before" />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginTop: "1.25rem",
              padding: "1rem 1.25rem",
              borderRadius: "0.5rem",
              background: "rgba(249,115,22,0.05)",
              border: "1px solid rgba(249,115,22,0.18)",
            }}
          >
            <AlertTriangle size={17} color="#f97316" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: F_BODY, fontSize: "0.85rem", color: "rgba(249,115,22,0.85)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#f97316" }}>Atenção:</strong> Um desempenho de{" "}
              <strong style={{ color: "#f97316" }}>70 pontos</strong> significa carregamento
              lento — cada segundo extra reduz conversões em até{" "}
              <strong style={{ color: "#f97316" }}>7%</strong>. Com SEO em 92 e Práticas
              Recomendadas em 73, o site também limitava o alcance orgânico e sinalizava
              problemas técnicos para o Google.
            </p>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontFamily: F_MONO, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              Print PageSpeed — Desktop Antes
            </p>
            <div style={{ borderRadius: "0.75rem", overflow: "hidden", border: "1px solid #1a1a1a" }}>
              <Image
                src="/pagespeed-desktop-antes.jpeg"
                alt="PageSpeed Desktop — Antes das otimizações"
                width={1200}
                height={700}
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
          </div>
        </section>

        {/* ══ ATO 2 ══ O Que Foi Feito ═════════════════════════════════════ */}
        <section className="section-spacing">
          <span style={{ fontFamily: F_MONO, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dc2626" }}>
            Ato 2
          </span>
          <h2 style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--text-primary)", margin: "0.375rem 0 0.75rem" }}>
            O Que Foi Feito
          </h2>
          <p style={{ fontFamily: F_BODY, fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "40rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Seis intervenções estratégicas cobrindo as três dimensões essenciais de um site
            profissional: velocidade, segurança e visibilidade no Google.
          </p>

          <div className="cards-grid">
            {IMPROVEMENTS.map((item, i) => (
              <AnimatedCard
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                description={item.description}
                badge={item.badge}
                delay={i * 80}
              />
            ))}
          </div>

          {/* Card de destaque full-width */}
          <div
            style={{
              padding: "2rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #1a0000 0%, #0f0f0f 100%)",
              border: "1px solid #3d0000",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                padding: "0.75rem",
                borderRadius: "0.5rem",
                background: "rgba(220,38,38,0.12)",
              }}
            >
              <CheckCircle2 size={22} color="#dc2626" />
            </div>
            <div>
              <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", margin: "0 0 0.625rem" }}>
                Resultado de cada ação combinada
              </h3>
              <p style={{ fontFamily: F_BODY, fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                A combinação dessas seis melhorias elevou o desempenho de{" "}
                <strong style={{ color: "#f97316" }}>70</strong> para{" "}
                <strong style={{ color: "#22c55e" }}>90</strong>, zerou as falhas de
                práticas recomendadas (de 73 para{" "}
                <strong style={{ color: "#22c55e" }}>100</strong>) e levou o SEO à
                pontuação máxima de{" "}
                <strong style={{ color: "#22c55e" }}>100</strong>. O Vale Zirá opera agora
                com segurança reforçada, código limpo e total conformidade com os critérios do Google.
              </p>
            </div>
          </div>
        </section>

        {/* ══ ATO 3 ══ Resultado Final ══════════════════════════════════════ */}
        <section>
          <span style={{ fontFamily: F_MONO, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22c55e" }}>
            Ato 3
          </span>
          <h2 style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--text-primary)", margin: "0.375rem 0 0.75rem" }}>
            Resultado Final
          </h2>
          <p style={{ fontFamily: F_BODY, fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "40rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Após as otimizações, o site alcançou pontuações de alto nível e conformidade total
            com os padrões técnicos exigidos pelo Google.
          </p>

          <ScoreBlock title="Desktop — Depois" scores={AFTER_DESKTOP} variant="after" />

          <div style={{ marginTop: "2.5rem" }}>
            <h3 style={{ fontFamily: F_DISPLAY, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Ganhos obtidos
            </h3>
            <div className="gains-grid">
              {GAINS.map((g) => (
                <GainCard key={g.label} label={g.label} delta={g.delta} color={g.color} />
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginTop: "2rem",
              padding: "1rem 1.25rem",
              borderRadius: "0.5rem",
              background: "rgba(34,197,94,0.04)",
              border: "1px solid rgba(34,197,94,0.18)",
            }}
          >
            <CheckCircle2 size={17} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: F_BODY, fontSize: "0.85rem", color: "rgba(34,197,94,0.85)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#22c55e" }}>Missão cumprida:</strong> O Vale Zirá passou
              de pontuação mediana para um site{" "}
              <strong style={{ color: "#22c55e" }}>tecnicamente sólido</strong>, seguro e
              otimizado para os buscadores — construindo uma base digital à altura do
              posicionamento premium da marca.
            </p>
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontFamily: F_MONO, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              Print PageSpeed — Desktop Depois
            </p>
            <div style={{ borderRadius: "0.75rem", overflow: "hidden", border: "1px solid #1a1a1a" }}>
              <Image
                src="/pagespeed-desktop-depois.jpeg"
                alt="PageSpeed Desktop — Depois das otimizações"
                width={1200}
                height={700}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: "2.5rem 1.5rem",
          marginTop: "4rem",
          textAlign: "center",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <p style={{ fontFamily: F_BODY, fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Relatório produzido por{" "}
          <strong style={{ color: "var(--text-primary)" }}>Go&amp;Grow</strong>
          {" "}· 2026
        </p>
        <p style={{ fontFamily: F_MONO, fontSize: "0.75rem", color: "#333", marginTop: "0.25rem" }}>
          valezira.com.br
        </p>
      </footer>
    </div>
  );
}
