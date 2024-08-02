import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/main.ts"],
    format: ["esm", "cjs"],
    dts: true,
    external: ["react", "react-router-dom"],
  },
  {
    entry: ["src/plugin.ts"],
    format: ["esm", "cjs"],
    dts: true,
  },
]);
