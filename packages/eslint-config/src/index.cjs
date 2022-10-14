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
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      plugins: ['sonarjs', 'unicorn', 'promise', 'import'],
      rules: {
        // Disallows if statements as the only statement in else blocks
        // https://eslint.org/docs/rules/no-lonely-if
        'no-lonely-if': 'error',
        // Disallows the use of console
        // https://eslint.org/docs/rules/no-console
        'no-console': 'error',
        // Requires method and property shorthand syntax for object literals
        // https://eslint.org/docs/rules/object-shorthand
        'object-shorthand': ['error', 'always'],
        // Disallows loops with a body that allows only one iteration
        // https://eslint.org/docs/rules/no-unreachable-loop
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

        // Disallows specified syntax
        // https://eslint.org/docs/rules/no-restricted-syntax
        'no-restricted-syntax': [
          'error',
          {
            // ❌ readFile(…, { encoding: … })
            selector: `CallExpression[callee.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=1] Property[key.name=encoding]`,
            message: `Specify encoding as last argument instead of object with encoding key`,
          },
          {
            // ❌ readFile(…, {})
            selector: `CallExpression[callee.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=0]`,
            message: 'Specify encoding as last argument',
          },
          {
            // ❌ readFileSync(…).toString(…)
            selector: `CallExpression[callee.name=readFileSync][parent.property.name=toString]`,
            message: `toString is redundant, specify encoding as last argument`,
          },
          {
            // ❌ ….readFile(…, { encoding: … })
            selector: `CallExpression[callee.type=MemberExpression][callee.property.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=1] Property[key.name=encoding]`,
            message: `Specify encoding as last argument instead of object with encoding key`,
          },
          {
            // ❌ ….readFile(…, {})
            selector: `CallExpression[callee.type=MemberExpression][callee.property.name=/readFileSync|readFile|writeFileSync|writeFile/] .arguments:last-child[type=ObjectExpression][properties.length=0]`,
            message: 'Specify encoding as last argument',
          },
        ],
        'no-else-return': ['error', { allowElseIf: false }],
        'promise/no-nesting': 'error',

        'import/extensions': ['ignorePackages'], // Bob when bundling requires to have `.js` extension
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off', // disable opposite of 'import/no-default-export'
        'unicorn/filename-case': 'error',

        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
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
      files: ['*.c{j,t}s'],
      env: {
        node: true,
      },
      rules: {
        // Disallows the use of require statements
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-var-requires.md
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['jest.config.js', 'webpack.config.js', 'bob.config.js', 'babel.config.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['*.spec.*'],
      env: {
        jest: true,
      },
    },
    {
      files: ['vite.config.ts', 'jest.config.js', '*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
