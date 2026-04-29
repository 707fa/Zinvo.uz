import type { NextConfig } from "next";
import path from "node:path";

const projectRoot = process.cwd();
const repositoryRoot = path.basename(projectRoot) === "zinvo" ? path.dirname(projectRoot) : projectRoot;

const serverLocalStorage = globalThis.localStorage;

if (
  typeof serverLocalStorage !== "undefined" &&
  typeof serverLocalStorage.getItem !== "function"
) {
  Reflect.deleteProperty(globalThis, "localStorage");
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: repositoryRoot,
  webpack: (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.join(projectRoot, "node_modules"),
      path.join(repositoryRoot, "node_modules"),
    ];

    return config;
  },
};

export default nextConfig;
