module.exports = {
  content: [
    './src/**/*.{tsx,mdx}',
    './theme.config.tsx',
    '../node_modules/nextra-theme-docs/dist/**/*.js',
    './node_modules/nextra-theme-docs/dist/**/*.js',
    // components v3 (remove when full migration is done)
    '../node_modules/@theguild/components/dist/index.mjs',
    './node_modules/@theguild/components/dist/index.mjs',
    // components v4 (remove when full migration is done)
    '../node_modules/@theguild/components/esm/**/*.js',
    './node_modules/@theguild/components/esm/**/*.js',
    // components v4 + tsup
    '../node_modules/@theguild/components/dist/**/*.{js,mjs}',
    './node_modules/@theguild/components/dist/**/*.{js,mjs}',
    // pnpm
    '../node_modules/.pnpm/node_modules/nextra-theme-docs/dist/**/*.js',
    '../node_modules/.pnpm/node_modules/@theguild/components/dist/**/*.{js,mjs}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    }
  },
  darkMode: 'class'
}
