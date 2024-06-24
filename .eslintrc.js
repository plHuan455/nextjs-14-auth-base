module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    // "plugin:import/errors",
    // "plugin:import/warnings",
    // "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "next",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "react/jsx-key": "warn",
    "no-console": "warn",
    "import/named": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "./tailwind.config.js",
    },
    next: {
      rootDir: ["./"],
    },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
}
