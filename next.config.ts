import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler desabilitado para evitar otimizações que interferem
  // em hooks de animação (IntersectionObserver + setState)
  reactCompiler: false,
};

export default nextConfig;
