import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: false,
  dts: false,
  minify: false,
  format: ["iife"],
});
