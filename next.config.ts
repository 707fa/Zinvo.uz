import type { NextConfig } from "next";
import path from "node:path";

const serverLocalStorage = globalThis.localStorage;

if (
  typeof serverLocalStorage !== "undefined" &&
  typeof serverLocalStorage.getItem !== "function"
) {
  Reflect.deleteProperty(globalThis, "localStorage");
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
