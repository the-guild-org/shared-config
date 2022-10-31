module.exports = {
  overrides: [
    {
      files: '*.json',
      excludedFiles: ['tsconfig.json'],
      extends: 'plugin:jsonc/recommended-with-json',
    },
    {
      files: ['*.jsonc', 'tsconfig.json'],
      extends: 'plugin:jsonc/recommended-with-jsonc',
    },
    {
      files: '*.json5',
      extends: 'plugin:jsonc/recommended-with-json5',
    },
    {
      files: '*.json{,c,5}',
      plugins: ['unicorn'],
      rules: {
        'unicorn/filename-case': 'error',
      },
    },
  ],
};
