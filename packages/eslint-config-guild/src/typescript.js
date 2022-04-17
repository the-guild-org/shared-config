require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    '!.*', // Don't ignore dot-files because by default ESLint ignore dot-files (except for .eslintrc.*) and dot-folders
  ],
  overrides: [
    {
      files: '*.{js,jsx,cjs,cjsx,mjs,mjsx,ts,tsx,cts,ctsx,mts,mtsx}',
      parser: '@typescript-eslint/parser',
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      plugins: ['sonarjs', 'unicorn'],
      rules: {
        'no-lonely-if': 'error',
        'no-console': 'error',
        'object-shorthand': ['error', 'always'],
        'no-unreachable-loop': 'error',
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
