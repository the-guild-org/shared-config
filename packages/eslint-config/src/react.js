module.exports = {
  overrides: [
    // Run rules only on JSX files
    {
      files: '*.{,c,m}{j,t}sx',
      extends: './react-base.js',
    },
    {
      files: '*.{,c,m}{j,t}s{,x}',
      rules: {
        // Disallow file extensions that may contain JSX
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.tsx', '.jsx'], allow: 'as-needed' },
        ],
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
