module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],

  rules: {
    "vue/require-default-prop": "off",
  },
};
