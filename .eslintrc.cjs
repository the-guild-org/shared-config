module.exports = {
  extends: ['@theguild', '@theguild/eslint-config/mdx'],
  env: {
    node: true,
  },
  overrides: [
    {
      files: 'packages/eslint-config/**',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: ['eslint-remote-tester-results'],
};
