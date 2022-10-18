# Additional custom rules for Playwright

[![CI](https://github.com/ffluk3/eslint-plugin-playwright/actions/workflows/ci.yml/badge.svg)](https://github.com/ffluk3/eslint-plugin-playwright/actions/workflows/ci.yml/badge.svg)
[![CD](https://github.com/ffluk3/eslint-plugin-playwright/actions/workflows/publish.yml/badge.svg)](https://github.com/ffluk3/eslint-plugin-playwright/actions/workflows/publish.yml/badge.svg)
[![NPM](https://img.shields.io/npm/v/@ffluk3/eslint-plugin-playwright)](https://www.npmjs.com/package/@ffluk3/eslint-plugin-playwright)

> ESLint plugin that extends [Playwright](https://github.com/microsoft/playwright)
> testing needs.

## Installation

Yarn

```bash
yarn add -D @ffluk3/eslint-plugin-playwright
```

NPM

```bash
npm install -D @ffluk3/eslint-plugin-playwright
```

## List of Supported Rules

<!-- TODO: Recommended configuration -->
<!-- ✔: Enabled in the recommended configuration.\
🔧: Some problems reported by this rule are automatically fixable by the [`--fix`](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix)
command line option.\
💡: Some problems reported by this rule are manually fixable by editor
[suggestions](https://eslint.org/docs/latest/developer-guide/working-with-rules#providing-suggestions). -->

|  ✔  | 🔧  | 💡  | Rule                                                 | Description                                       |
| :-: | :-: | :-: | ---------------------------------------------------- | ------------------------------------------------- |
|     |     |     | [test-case-naming](./docs/rules/test-case-naming.md) | Allows you to enforce patterns on some test names |
