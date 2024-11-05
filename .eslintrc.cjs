module.exports = {
  extends: [
    '@theguild',
    '@theguild/eslint-config/react',
    '@theguild/eslint-config/json',
    '@theguild/eslint-config/yml',
    '@theguild/eslint-config/mdx',
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: 'packages/eslint-config/**',
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    {
      files: 'packages/prettier-config/README.md/*.js',
      rules: {
        'unicorn/prefer-export-from': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
  ignorePatterns: ['eslint-remote-tester-results'],
};
