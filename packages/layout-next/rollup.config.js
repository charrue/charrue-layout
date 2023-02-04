import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import esbuild, { minify } from "rollup-plugin-esbuild";

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      format: "umd",
      file: "./dist/index.full.js",
      exports: "named",
      name: "CHARRUE_LAYOUT",
      globals: {
        vue: "Vue",
        "vue-router": "VueRouter",
        "element-plus": "ElementPlus",
      },
      sourcemap: true,
    },
  ],
  external: ["vue", "vue-router", "element-plus"],
  treeshake: true,
  plugins: [
    nodeResolve({
      extensions: [".mjs", ".js", ".json", ".ts"],
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: true,
      target: "es2015",
      loaders: {
        ".vue": "ts",
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      treeShaking: true,
      legalComments: "eof",
    }),
    minify({
      target: "es2015",
      sourceMap: true,
    }),
  ],
});
