require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    '!.*', // Don't ignore dot-files because by default ESLint ignore dot-files (except for .eslintrc.*) and dot-folders
  ],
  overrides: [
    {
      files: '*.c{j,t}s',
      env: {
        node: true,
      },
    },
    {
      files: '*.{,c,m}{j,t}s{,x}',
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      plugins: ['sonarjs', 'unicorn'],
      rules: {
        'no-lonely-if': 'error',
        'no-console': 'error',
        'object-shorthand': ['error', 'always'],
        'no-unreachable-loop': 'error',
        'sonarjs/no-one-iteration-loop': 'off', // similar to `no-unreachable-loop` but reports less cases
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

        // TODO
        // Test if provoke false positive when `import ...` and `import type ...` were used
        // 'no-duplicate-imports': 'error',
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
  ],
};
