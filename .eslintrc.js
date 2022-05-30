module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
