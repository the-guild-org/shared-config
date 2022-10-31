module.exports = {
  overrides: [
    {
      files: '*.md{,x}',
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      extends: ['./base', './react-base.js'],
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
    {
      files: [
        '**/*.md{,x}/*', // Redundant, rule already compare physical filename
        '.changeset/*.md',
        'CHANGELOG.md',
      ],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    {
      files: ['**/*.md{,x}/*'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
