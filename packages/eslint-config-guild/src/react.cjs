module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
  },
  overrides: [
    {
      files: '*.{,c,m}{j,t}s{,x}',
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
      ],
      rules: {
        'react/jsx-curly-brace-presence': 'error',
      },
    },
  ],
};
