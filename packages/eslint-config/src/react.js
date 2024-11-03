const { CODE_FILE } = require('./constants.js');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['next-env.d.ts'],
  overrides: [
    {
      files: CODE_FILE,
      extends: './react-base',
    },
    {
      files: [
        '**/pages/**', // Next.js' `pages` directory use default export
        '**/app/**/{layout,page,not-found}.tsx', // Next.js' `layout`/`page`/`not-found` components use default export
        '**/app/**/_meta.{ts,tsx}', // Nextra's `_meta` file uses default export
        'next.config.{js,mjs,ts}',
        '**/*.stories.tsx',
        '.storybook/main.ts',
        'website/theme.config.tsx',
        'postcss.config.js',
        'tailwind.config.ts',
        'next-sitemap.config.js',
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
