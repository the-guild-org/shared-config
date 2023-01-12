const { CODE_BLOCK } = require('./constants.js');

/** @type {import('eslint').Linter.Config} */
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
        '@typescript-eslint/prefer-optional-chain': 'off', // throws "parserOptions.project" error
      },
      settings: {
        'mdx/code-blocks': true,
      },
    },
    // Disable filename check
    {
      files: [
        CODE_BLOCK,
        '.changeset/*.md',
        'CHANGELOG.md',
        '.github/**/PULL_REQUEST_TEMPLATE.md',
        '.github/ISSUE_TEMPLATE/bug_report.md',
        'SECURITY.md',
        'CODE_OF_CONDUCT.md',
        'README.md',
      ],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    // Disable rules for code blocks
    {
      files: [CODE_BLOCK],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-undef': 'off',
        'import/extensions': 'off',
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
