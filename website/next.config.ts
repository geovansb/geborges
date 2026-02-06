import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import path from "path";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: configDir,
  },
};

export default nextConfig;
