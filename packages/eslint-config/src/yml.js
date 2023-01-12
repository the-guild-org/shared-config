const { CODE_BLOCK } = require('./constants.js');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['pnpm-lock.yaml'],
  overrides: [
    {
      files: '*.y{,a}ml',
      excludedFiles: [CODE_BLOCK, '.github/FUNDING.yml'],
      extends: ['plugin:yml/standard', 'plugin:yml/prettier'],
      plugins: ['unicorn'],
      rules: {
        'unicorn/filename-case': 'error',
      },
    },
  ],
};
