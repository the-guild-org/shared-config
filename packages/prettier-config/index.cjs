const { builtinModules } = require('node:module');

module.exports = {
  trailingComma: 'all', // default to `all` in v3
  printWidth: 100,
  singleQuote: true,
  arrowParens: 'avoid',
  proseWrap: 'always', // printWidth line breaks in md/mdx
  overrides: [
    {
      files: '*.md{,x}',
      options: {
        semi: false,
        trailingComma: 'none',
      },
    },
  ],
  plugins: [
    // for prettifying shellscript, Dockerfile, properties, gitignore, dotenv
    require('prettier-plugin-sh'),
    // for sort fields in package.json
    require('prettier-plugin-pkg'),
    // for sorting imports
    require('@trivago/prettier-plugin-sort-imports'),
  ],
  importOrder: [
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
    '<THIRD_PARTY_MODULES>',
    // Relative imports.
    // Anything that starts with a dot.
    '^\\.',
    '^.+\\.(graphql|css|png|svg|jpe?g|webp|avif|wasm|mp4|webm)',
  ],
  importOrderSeparation: false, // import order groups wont be separated by a new line
  importOrderSortSpecifiers: true, // sorts the import specifiers alphabetically
  importOrderCaseInsensitive: true, // case insensitive sorting
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};
