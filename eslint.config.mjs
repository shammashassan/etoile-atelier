import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import shadcn from "@shadcn/lint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      "app/**/*.{ts,tsx}",
      "components/dashboard/**/*.{ts,tsx}",
      "components/shared/**/*.{ts,tsx}",
    ],
    plugins: {
      shadcn,
    },
    rules: {
      "shadcn/no-restyle": "warn",
      "shadcn/no-raw-colors": "warn",
      "shadcn/no-arbitrary-values": "warn",
      "shadcn/no-inline-styles": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
