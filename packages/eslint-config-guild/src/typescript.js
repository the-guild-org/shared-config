module.exports = {
  reportUnusedDisableDirectives: true,
  extends: ['eslint:recommended'],
  ignorePatterns: [
    '!.*', // Don't ignore dot-files because by default ESLint ignore dot-files (except for .eslintrc.*) and dot-folders
  ],
};
