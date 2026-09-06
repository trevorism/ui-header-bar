import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...vue.configs["flat/essential"],
  {
    files: ["src/**/*.{js,vue}", "test/**/*.js", "*.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
