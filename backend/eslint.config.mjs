import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import jestPlugin from "eslint-plugin-jest";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-console": ["error"],
    },
  },
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.test.{js,ts}"],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: globals.jest,
    },
    rules: {
      "jest/expect-expect": "warn",
      "jest/no-disabled-tests": "warn",
      "no-console": "error",
    },
  },
]);
