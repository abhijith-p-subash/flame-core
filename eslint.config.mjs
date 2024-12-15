import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // The files to lint
  { files: ["**/*.{js,mjs,cjs,ts}"] },

  // Specify globals
  { languageOptions: { globals: globals.browser } },

  // Use recommended configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // Add ignores to specify files/folders to exclude from linting
  {
    ignores: ["node_modules", "dist", "build", "*.min.js"],
  },
];
