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
      files: '*.{js,jsx,cjs,cjsx,mjs,mjsx,ts,tsx,cts,ctsx,mts,mtsx}',
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      rules: {
        'react/jsx-curly-brace-presence': 'error',
      },
    },
  ],
};
