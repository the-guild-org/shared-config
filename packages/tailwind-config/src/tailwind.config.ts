import { type Config } from 'tailwindcss';
import { hiveColors } from './hive-colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- tailwindcss types are incorrect
const makePrimaryColor: any =
  (l: number) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    `hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) ${l}%` +
    (opacityValue ? ` / ${opacityValue}` : '') +
    ')';

const config = {
  /**
   * Same as `class`, but with the ability to have light-only sections in dark mode.
   * @see https://github.com/tailwindlabs/tailwindcss/pull/12717/files#diff-cf9185e083748e39c6940d3ad337df23b0ecbbd70b9550f596de7cf4b4668bcfR263-R273
   */
  darkMode: ['variant', '&:not(.light *)'],
  content: [
    './src/**/*.{tsx,mdx}',
    './theme.config.tsx',
    // components v4 + tsup
    '../node_modules/@theguild/components/dist/**/*.{js,mjs}',
    './node_modules/@theguild/components/dist/**/*.{js,mjs}',
    // pnpm
    '../node_modules/.pnpm/node_modules/@theguild/components/dist/**/*.{js,mjs}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    letterSpacing: {
      tight: '-0.015em',
    },
    extend: {
      colors: {
        ...hiveColors,
        dark: '#111',
        primary: {
          50: makePrimaryColor(97),
          100: makePrimaryColor(94),
          200: makePrimaryColor(86),
          300: makePrimaryColor(77),
          400: makePrimaryColor(66),
          500: makePrimaryColor(50),
          600: makePrimaryColor(45),
          700: makePrimaryColor(39),
          750: makePrimaryColor(35),
          800: makePrimaryColor(32),
          900: makePrimaryColor(24),
          1000: makePrimaryColor(12),
        },
      },
    },
  },
} satisfies Config;

export default config;
export { type Config };
