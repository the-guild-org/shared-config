module.exports = {
  // Extending follow configs to lint code blocks content by their virtual filenames
  extends: ['./react', './json'],
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
      ],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    // Disable code-file rules inside md/mdx
    {
      files: ['**/*.md{,x}/*'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
