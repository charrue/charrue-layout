import { defineConfig } from "@charrue/vue3-bundler";

export default defineConfig({
  vueBuild: {
    input: "./index.js",
    outputDir: "dist",
    name: "CharrueLayout",
    shouldModuleBuild: false,
    shouldFullBuild: true,
  },
});
