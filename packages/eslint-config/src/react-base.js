const { REACT_RESTRICTED_SYNTAX } = require('./constants.js');

const RESTRICTED_IMPORTS = [
  {
    name: 'react',
    importNames: ['PropsWithChildren'],
    message:
      '`PropsWithChildren` set `children` as optional, explicitly define `children` field in your type',
  },
];

/** @type {import('eslint').Linter.Config} */
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
    'plugin:react/jsx-runtime',
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
    // Disallow extra closing tags for components without children
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    'react/self-closing-comp': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/no-unused-state': 'error',
    'react/no-unescaped-entities': 'off', // annoying
    'react/jsx-no-undef': 'off', // same as `no-undef`
    'import/extensions': ['error', 'ignorePackages', { tsx: 'never', ts: 'never' }],
    'no-restricted-syntax': ['error', ...REACT_RESTRICTED_SYNTAX],
    // Disallow file extensions that may contain JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'], allow: 'as-needed' }],
    'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: [/^\[\w+]\.tsx?$/] }],
    'react/prop-types': 'off',
    'react/jsx-boolean-value': 'error',
    'react/hook-use-state': 'error',
    'react/iframe-missing-sandbox': 'error',

    // TODO: add in base config
    'prefer-destructuring': ['error', { VariableDeclarator: { object: true } }],
    quotes: ['error', 'single', { avoidEscape: true }], // Matches Prettier, but also replaces backticks
  },
};
