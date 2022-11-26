module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ["@charrue/base", "plugin:vue/vue3-recommended", "plugin:prettier/recommended"],

  rules: {
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "import/no-cycle": "off",
  },
};
