import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project sits inside a parent directory that has its own lockfile.
  // Without an explicit root, Turbopack walks up, finds it, and infers the
  // wrong workspace root.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
