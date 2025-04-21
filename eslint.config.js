import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import chakraUi from "eslint-plugin-chakra-ui";
import parser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["./src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      react,
      "chakra-ui": chakraUi,
      "@typescript-eslint": tseslint.plugin,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        parser,
        project: ["./tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  js.configs.recommended,
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
      "no-undef": "off",
      "import/no-unresolved": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "chakra-ui/props-order": "error",
      "chakra-ui/props-shorthand": "error",
      "chakra-ui/require-specific-component": "error",
    },
  },
  globalIgnores(["./src/components/ui"]),
]);
