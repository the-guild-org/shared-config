module.exports = {
  ignorePatterns: ['pnpm-lock.yaml'],
  overrides: [
    {
      files: '*.y{,a}ml',
      extends: ['plugin:yml/standard', 'plugin:yml/prettier'],
      plugins: ['unicorn'],
      rules: {
        'unicorn/filename-case': 'error',
      },
    },
  ],
};
