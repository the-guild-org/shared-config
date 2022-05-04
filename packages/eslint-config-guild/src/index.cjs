require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    '!.*', // Don't ignore dot-files because by default ESLint ignore dot-files (except for .eslintrc.*) and dot-folders
  ],
  overrides: [
    {
      files: '*.{,c,m}{j,t}s{,x}',
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      plugins: ['sonarjs', 'unicorn', 'promise'],
      rules: {
        'no-lonely-if': 'error',
        'no-console': 'error',
        'object-shorthand': ['error', 'always'],
        'no-unreachable-loop': 'error',
        'sonarjs/no-one-iteration-loop': 'off', // similar to 'no-unreachable-loop' but reports less cases
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

        'sonarjs/no-unused-collection': 'error',
        'sonarjs/no-identical-conditions': 'error',
        'sonarjs/no-inverted-boolean-check': 'error',
        'sonarjs/no-use-of-empty-return-value': 'error',
        'sonarjs/no-gratuitous-expressions': 'error',
        'sonarjs/no-nested-switch': 'error',
        'unicorn/no-lonely-if': 'error',
        'sonarjs/no-collapsible-if': 'off', // same as 'unicorn/no-lonely-if'
        'unicorn/no-array-push-push': 'error',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-empty-file': 'error',
        'unicorn/no-useless-fallback-in-spread': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/prefer-includes': 'error',

        'no-restricted-syntax': [
          'error',
          {
            // ❌ readFile(…, { encoding: … })
            selector: `CallExpression[callee.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=1] Property[key.name=encoding]`,
            message: `Specify encoding as last argument instead of object with encoding key.`,
          },
          {
            // ❌ readFile(…, {})
            selector: `CallExpression[callee.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=0]`,
            message: 'Remove empty object.',
          },
          {
            // ❌ readFileSync(…).toString(…)
            selector: `CallExpression[callee.name=readFileSync][parent.property.name=toString]`,
            message: `toString is redundant, specify encoding as last argument.`,
          },
          {
            // ❌ ….readFile(…, { encoding: … })
            selector: `CallExpression[callee.type=MemberExpression][callee.property.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=1] Property[key.name=encoding]`,
            message: `Specify encoding as last argument instead of object with encoding key.`,
          },
          {
            // ❌ ….readFile(…, {})
            selector: `CallExpression[callee.type=MemberExpression][callee.property.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=0]`,
            message: 'Empty object is redundant.',
          },
        ],
        'no-else-return': ['error', { allowElseIf: false }],
        'promise/no-nesting': 'warn',

        // TODO
        // Test if provoke false positive when `import ...` and `import type ...` were used
        // 'no-duplicate-imports': 'error',
        //
        // Rediscuss later
        // 'prefer-destructuring': [
        //   'error',
        //   {
        //     VariableDeclarator: { array: false, object: true },
        //     AssignmentExpression: { array: true, object: false },
        //   },
        //   { enforceForRenamedProperties: false },
        // ],
      },
    },
    {
      files: ['*.c{j,t}s', 'next.config.mjs', 'postcss.config.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
