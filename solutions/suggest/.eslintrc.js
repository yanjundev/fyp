/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@fyp/eslint-config/index.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
