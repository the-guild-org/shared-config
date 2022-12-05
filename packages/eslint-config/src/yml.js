const { CODE_BLOCK } = require('./constants.js');

module.exports = {
  ignorePatterns: ['pnpm-lock.yaml'],
  overrides: [
    {
      files: '*.y{,a}ml',
      excludedFiles: CODE_BLOCK,
      extends: ['plugin:yml/standard', 'plugin:yml/prettier'],
      plugins: ['unicorn'],
      rules: {
        'unicorn/filename-case': 'error',
      },
    },
  ],
};
