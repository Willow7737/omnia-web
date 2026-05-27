import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_BASE_PATH === "/omnia-web";
const isLiveMode = process.env.NEXT_PUBLIC_LIVE_MODE === "true";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages; SSR for live testnet dashboard
  ...(isLiveMode ? {} : { output: "export" }),
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/omnia-web" : undefined,
  assetPrefix: isGitHubPages ? "/omnia-web" : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
