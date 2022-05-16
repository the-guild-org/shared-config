module.exports = {
  trailingComma: 'es5',
  printWidth: 120,
  singleQuote: true,
  arrowParens: 'avoid',
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
    'prettier-plugin-sh',
  ],
};
