module.exports = {
    root: true,
    "ignorePatterns": [".eslintrc.js", "jest.config.js", "**/node_modules/**"],
    parser: '@typescript-eslint/parser',
    "extends": [
        "eslint:recommended",
        "plugin:eslint-plugin/recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended'
    ],
    "rules": {
        "eslint-plugin/require-meta-docs-description": "error"
    }
}