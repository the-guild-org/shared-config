module.exports = {
  overrides: [
    {
      files: '*.md{,x}',
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      extends: ['./base', './react-base'],
      parserOptions: {
        ecmaVersion: 13,
      },
      rules: {
        'react/self-closing-comp': 'off', // TODO: false positive https://github.com/mdx-js/eslint-mdx/issues/437
        'mdx/remark': 'error',
        'import/no-default-export': 'off',
      },
      settings: {
        'mdx/code-blocks': true,
      },
    },
    // Disable filename check
    {
      files: [
        '**/*.md{,x}/*', // Redundant, in first override rule already compare filename
        '.changeset/*.md',
        'CHANGELOG.md',
        '.github/workflows/pull_request_template.md',
        'SECURITY.md',
        'CODE_OF_CONDUCT.md',
        'README.md'
      ],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    // Disable code-file rules inside md/mdx
    {
      files: ['**/*.md{,x}/*'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
    // Disable rules that requires types information
    {
      files: ['*.md{,x}', '**/*.md{,x}/*'],
      rules: {
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/return-await': 'off',
      },
    },
  ],
};
