import { Plugin } from "vue";
import Layout from "./Layout";

const plugin: Plugin = {
  install(app) {
    app.component("CharrueLayout", Layout);
  },
};

export { Layout };
export * from "./types";
export default plugin;
