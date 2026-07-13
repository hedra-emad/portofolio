import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project sits inside a parent directory that has its own lockfile.
  // Without an explicit root, Turbopack walks up, finds it, and infers the
  // wrong workspace root.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  async redirects() {
    return [
      {
        // /cv is a short, memorable URL that survives the PDF being renamed.
        //
        // Declared here rather than as a route handler on purpose: a route
        // handler would make /cv a serverless function, rendered on demand, for
        // what is a redirect. This is handled at the edge before any function
        // runs, and it keeps every route in the app statically prerendered.
        source: "/cv",
        destination: "/hedra-emad-fawzy-cv.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
