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
        // Disallows specific imports
        // https://eslint.org/docs/rules/no-restricted-imports
        'no-restricted-imports': [
          'error',
          {
            name: 'react',
            importNames: ['FC', 'FunctionComponent'],
            message: 'Just type props and `ReactElement` as return type',
          },
        ],
        'react/react-in-jsx-scope': 'off', // import of React is no longer required starting from react@17
      },
    },
    {
      files: [
        '**/pages/**', // Next.js pages directory use default export
        'next.config.mjs',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['next.config.mjs'],
      env: {
        node: true,
      },
    },
  ],
};
