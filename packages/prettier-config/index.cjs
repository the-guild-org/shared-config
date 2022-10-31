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
  ],
};
