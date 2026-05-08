import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint"; // Энийг нэмсэн

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Бүх файлуудыг (js, mjs, ts, mts) таних тохиргоо
  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts}"], // Энд mts-ийг нэмлээ
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  // 2. JS-ийн үндсэн дүрмүүд
  pluginJs.configs.recommended,

  // 3. TS-ийн үндсэн дүрмүүд (Энийг заавал нэмэх хэрэгтэй)
  ...tseslint.configs.recommended,

  // 4. Ignore хийх хавтаснууд
  {
    ignores: ["node_modules/", "dist/", "**/temp.js"],
  },
];
