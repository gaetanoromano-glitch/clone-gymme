import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Pin the workspace root to this project. Without this, Next infers the root
  // from the outermost package-lock.json up the tree and Turbopack scans a huge
  // parent directory (see Atelier's pinNextWorkspaceRoot).
  outputFileTracingRoot: __dirname,
  turbopack: { root: __dirname },
};

export default nextConfig;