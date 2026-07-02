import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_BASE_PATH === "/omnia-web";
const isLiveMode = process.env.NEXT_PUBLIC_LIVE_MODE === "true";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages; SSR for live testnet dashboard
  ...(isLiveMode ? { output: "standalone" } : { output: "export" }),
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  // Emit each route as <route>/index.html so GitHub Pages serves
  // extensionless URLs unambiguously (avoids docs.html vs docs/ conflicts).
  trailingSlash: !isLiveMode,
  basePath: isGitHubPages ? "/omnia-web" : undefined,
  assetPrefix: isGitHubPages ? "/omnia-web" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/omnia-web" : "",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
