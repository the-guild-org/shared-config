module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-curly-brace-presence': 'error',
  },
};
