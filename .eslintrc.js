/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@figma/figma-plugins/recommended"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  root: true,
}
