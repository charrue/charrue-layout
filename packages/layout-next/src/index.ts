import CharrueLayout from "./Layout";

const plugin = {
  install(app: any) {
    app.component("CharrueLayout", CharrueLayout);
  },
};

export { CharrueLayout };
export * from "./helper/types";
export * from "./helper/public";
export default plugin;
