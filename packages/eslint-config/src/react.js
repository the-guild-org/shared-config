const { CODE_FILE, CODE_BLOCK } = require('./constants.js');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['next-env.d.ts'],
  overrides: [
    {
      files: CODE_FILE,
      extends: './react-base',
    },
    {
      files: CODE_FILE,
      excludedFiles: CODE_BLOCK,
      rules: {
        'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: [/^\[\w+]\.tsx?$/] }],
      },
    },
    {
      files: [
        '**/pages/**', // Next.js pages directory use default export
        'next.config.{js,mjs}',
        '**/*.stories.tsx',
        '.storybook/main.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['next.config.{js,mjs}'],
      env: {
        node: true,
      },
    },
  ],
};
