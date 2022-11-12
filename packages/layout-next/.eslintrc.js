module.exports = {
  extends: ["@charrue/typescript", "../../.eslintrc.js"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "no-nested-ternary": "off",
  },
};
