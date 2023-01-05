const { builtinModules } = require('node:module');

const RESTRICTED_MODULES = [
  { name: 'axios', message: 'Use `fetch/node-fetch` instead.' },
  { name: 'moment', message: 'Use `dayjs/date-fns` instead.' },
  { name: 'classnames', message: 'Use `clsx` instead because he is faster.' },
];

const RESTRICTED_SYNTAX = [
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
];

const SORT_IMPORTS_GROUPS = [
  [
    // Side effect imports.
    '^\\u0000',
    // Node.js builtins
    `^(node:)?(${builtinModules
      .filter(mod => !mod.startsWith('_') && !mod.includes('/'))
      .join('|')})(/.*|$)`,
    '^react(-dom)?$',
    '^next(/.*|$)',
    // Packages.
    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
    '^@?\\w',
    // Absolute imports and other imports such as Vue-style `@/foo`.
    // Anything not matched in another group.
    '^',
    // Relative imports.
    // Anything that starts with a dot.
    '^\\.',
    '^.+\\.(graphql|css|png|svg|jpe?g|webp|avif|wasm)',
  ],
];

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['sonarjs', 'unicorn', 'promise', 'import', 'n', 'simple-import-sort'],
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
    'no-restricted-syntax': ['error', ...RESTRICTED_SYNTAX],
    'no-else-return': ['error', { allowElseIf: false }],
    'promise/no-nesting': 'error',

    'import/extensions': ['error', 'ignorePackages'], // Bob when bundling requires to have `.js` extension
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off', // disable opposite of 'import/no-default-export'

    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Enforce the style of numeric separators by correctly grouping digits
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md
    'unicorn/numeric-separators-style': 'error',
    // Prefer using the node: protocol when importing Node.js builtin modules
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
    'unicorn/prefer-node-protocol': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': ['error', { groups: SORT_IMPORTS_GROUPS }],
    // Reports any imports that come after non-import statements
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
    'import/first': 'error',
    // Disallow shorthand type conversions
    // https://eslint.org/docs/latest/rules/no-implicit-coercion
    'no-implicit-coercion': ['error', { disallowTemplateShorthand: true }],
    // Disallow specified modules when loaded by `import` declarations
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-import.md
    'n/no-restricted-import': ['error', RESTRICTED_MODULES],
    // Disallow specified modules when loaded by require
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-require.md
    'n/no-restricted-require': ['error', RESTRICTED_MODULES],
    'no-restricted-modules': 'off', // deprecated in favor of corresponding rules from `eslint-plugin-n`

    // Disallow specified global variables
    // https://eslint.org/docs/latest/rules/no-restricted-globals
    'no-restricted-globals': ['error', 'stop'],

    '@typescript-eslint/no-explicit-any': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],

    'require-await': 'off',
    // Disallow async functions which have no await expression
    // https://typescript-eslint.io/rules/require-await/
    // '@typescript-eslint/require-await': 'error', // TODO: enable

    'no-return-await': 'off',
    // Enforce consistent returning of awaited values.
    // https://typescript-eslint.io/rules/return-await/
    // '@typescript-eslint/return-await': 'error', // TODO: enable

    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
  },
};

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
