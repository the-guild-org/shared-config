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
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
    { files: '*.json', options: { trailingComma: 'none' } },
  ],
  plugins: [
    // for prettifying shellscript, Dockerfile, properties, gitignore, dotenv
    'prettier-plugin-sh',
    // for sort fields in package.json
    'prettier-plugin-pkg',
    // for sorting imports
    '@ianvs/prettier-plugin-sort-imports',
  ],
  importOrder: [
    // React and Next.
    '^react(-dom)?$',
    '^next(/.*|$)',
    // Anything not matched in other groups.
    '<THIRD_PARTY_MODULES>',
    // Things that start with `@` or digit or underscore.
    '^(@|\\d|_)',
    // Anything that starts with a dot, or multiple dots, and doesn't have the "other files" extensions.
    '^(?=\\.+)(.(?!\\.(graphql|css|png|svg|jpe?g|webp|avif|wasm|mp4|webm)))+$',
    // Other files with extensions.
    '^.+\\.(graphql|css|png|svg|jpe?g|webp|avif|wasm|mp4|webm)$',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};
