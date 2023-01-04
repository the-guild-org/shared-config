const { CODE_BLOCK } = require('./constants.js');

const JSONC_FILES = ['tsconfig.json', 'tsconfig.eslint.json', 'turbo.json', '.vscode/launch.json'];

module.exports = {
  overrides: [
    {
      files: '*.json',
      excludedFiles: JSONC_FILES,
      extends: 'plugin:jsonc/recommended-with-json',
    },
    {
      files: ['*.jsonc', ...JSONC_FILES],
      extends: 'plugin:jsonc/recommended-with-jsonc',
    },
    {
      files: '*.json5',
      extends: 'plugin:jsonc/recommended-with-json5',
    },
    {
      files: '*.json{,c,5}',
      excludedFiles: CODE_BLOCK,
      plugins: ['unicorn'],
      rules: {
        'unicorn/filename-case': 'error',
      },
    },
  ],
};
