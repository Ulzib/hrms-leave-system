import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Шалгах файлуудын төрөл ба хавтас
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  pluginJs.configs.recommended,

  {
    ignores: ["**/temp.js", "dist/*"],
  },
];
