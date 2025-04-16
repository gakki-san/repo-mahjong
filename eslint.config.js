import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import chakraUiPlugin from "eslint-plugin-chakra-ui";
import parser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["./src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js, "react-hooks": reactHooks, "chakra-ui": chakraUiPlugin },
    extends: [
      "js/recommended",
      "eslint:recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        parser,
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs["recommended-latest"],
  importPlugin.flatConfigs.recommended,

  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      semi: "error",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-dynamic-require": "warn",
      "import/no-nodejs-modules": "warn",
      "chakra-ui/props-order": "error",
      "chakra-ui/props-shorthand": "error",
      "chakra-ui/require-specific-component": "error",
    },
  },
]);
