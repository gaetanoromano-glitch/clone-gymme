import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    sri: { algorithm: undefined },
  },
};

export default nextConfig;
