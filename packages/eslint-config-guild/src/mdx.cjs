module.exports = {
  overrides: [
    {
      files: '*.md{,x}',
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      rules: {
        'mdx/remark': 'error',
      },
      settings: {
        'mdx/code-blocks': true,
      },
    },
    {
      files: ['*.md{,x}', '*.{j,t}s{,x}'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['react'],
      rules: {
        'react/self-closing-comp': 'error',
        'react/jsx-curly-brace-presence': 'error',
      },
    },
  ],
};
