const { REACT_RESTRICTED_SYNTAX } = require('./constants.js');

const RESTRICTED_IMPORTS = [
  {
    name: 'react',
    importNames: ['FC', 'FunctionComponent'],
    message: 'Just type props and `ReactElement` as return type',
  },
  {
    name: 'react',
    importNames: ['PropsWithChildren'],
    message:
      '`PropsWithChildren` set `children` as optional, explicitly define `children` field in your type',
  },
];

module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
  },
  plugins: ['import', 'unicorn'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // Disallow unnecessary JSX expressions when literals alone are sufficient
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-no-literals': 'off', // opposite of `react/jsx-curly-brace-presence`
    // Disallows specific imports
    // https://typescript-eslint.io/rules/no-restricted-imports
    '@typescript-eslint/no-restricted-imports': ['error', ...RESTRICTED_IMPORTS],
    'react/react-in-jsx-scope': 'off', // import of React is no longer required starting from react@17
    // Disallow extra closing tags for components without children
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    'react/self-closing-comp': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/no-unused-state': 'error',
    'react/no-unescaped-entities': 'off', // annoying
    'react/jsx-no-undef': 'off', // same as `no-undef`

    'import/extensions': ['error', 'ignorePackages', { tsx: 'never', ts: 'never' }],
    'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: [/^\[\w+]\.tsx?$/] }],
    'no-restricted-syntax': ['error', ...REACT_RESTRICTED_SYNTAX],

    'react/prop-types': 'off',
    'react/jsx-boolean-value': 'error',

    // TODO: add in base config
    'prefer-destructuring': ['error', { VariableDeclarator: { object: true } }],
    // quotes: ['error', 'single', { avoidEscape: true }], // Matches Prettier, but also replaces backticks
  },
};
