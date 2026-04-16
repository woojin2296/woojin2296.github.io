import type { NextConfig } from "next";

const repo = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/|\/$/g, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(repo
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
};

export default nextConfig;
