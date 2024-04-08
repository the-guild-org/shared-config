import { type Config } from 'tailwindcss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- tailwindcss types are incorrect
const makePrimaryColor: any =
  (l: number) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    `hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) ${l}%` +
    (opacityValue ? ` / ${opacityValue}` : '') +
    ')';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,mdx}', './theme.config.tsx'],
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
};

export default config;
export { type Config };
