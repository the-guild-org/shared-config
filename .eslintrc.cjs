module.exports = {
  reportUnusedDisableDirectives: true,
  extends: ['eslint:recommended'],
  rules: {},
  ignorePatterns: ['!.*'],
  overrides: [
    {
      files: ['packages/eslint-config-guild/**'],
      env: {
        node: true,
      },
    },
  ],
};
