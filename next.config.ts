import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/guitar-hiero",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
