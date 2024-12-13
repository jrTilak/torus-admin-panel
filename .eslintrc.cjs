/** @type {import("eslint").Linter.Config} */
module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "amd": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "@typescript-eslint",
    "simple-import-sort",
    "unicorn",
    "react",
    "jsx-a11y",
    "import",
    "react-hooks",
    "react-refresh"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier"
  ],
  "rules": {
    "prefer-promise-reject-errors": "error",
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "*", "next": "block" },
      { "blankLine": "always", "prev": "block", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "block-like" },
      { "blankLine": "always", "prev": "block-like", "next": "*" }
    ],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.name='require']",
        "message": "Use import instead of require",
      },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        "groups": [
          ["^react", "^@?\\w"],
          ["^(@|components)(/.*|$)"],
          ["^\\u0000"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.?(css)$"]
        ]
      }
    ],
    "simple-import-sort/exports": "error",
    "react/display-name": "off",
    "unicorn/filename-case": [
      "error",
      {
        "cases": {
          "kebabCase": true,
        }
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-console": "warn",
    "react-refresh/only-export-components": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "no-restricted-syntax": "off"
      }
    },
  ]
}