import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module", // <- 이 부분을 'module'로 수정
      },
    },
    rules: {
      // 1. 기존 프로젝트의 no-unused-vars 규칙 유지 (대문자 변수는 무시)
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // 2. HMR (Vite) 관련 규칙 추가
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // 3. React Prop-types 규칙 추가 (필요 시)
      "react/prop-types": "off",
    },
  },
]);
