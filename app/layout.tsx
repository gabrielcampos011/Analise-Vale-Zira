import type { Metadata } from "next";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Relatório de Otimização — Vale Zirá · Go&Grow",
  description:
    "Análise completa das melhorias de performance, segurança e SEO implementadas no site valezira.com.br.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmMono.variable} ${dmSans.variable}`}
      style={{ backgroundColor: "#080808" }}
    >
      <body style={{ margin: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
