import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_BASE_PATH === "/omnia-web";

const nextConfig: NextConfig = {
  output: "export",
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
