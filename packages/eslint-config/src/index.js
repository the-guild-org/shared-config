require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    '!.*', // Don't ignore dot-files because by default ESLint ignore dot-files (except for .eslintrc.*) and dot-folders
    '.git',
  ],
  overrides: [
    {
      files: '*.{,c,m}{j,t}s{,x}',
      extends: './base',
    },
    {
      files: ['*.c{j,t}s'],
      env: { node: true },
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
    {
      files: ['jest.config.js', 'webpack.config.js', 'bob.config.js', 'babel.config.js'],
      env: { node: true },
    },
    {
      files: ['*.{spec,test}.*'],
      env: { jest: true },
      rules: { 'import/extensions': ['error', 'never'] },
    },
    {
      files: ['vite.config.ts', 'jest.config.js', '*.d.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
};
