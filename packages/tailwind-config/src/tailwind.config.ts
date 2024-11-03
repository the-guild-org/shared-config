import path from 'node:path';
import { type Config } from 'tailwindcss';
import { hiveColors } from './hive-colors.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- tailwindcss types are incorrect
const makePrimaryColor: any =
  (l: number) =>
  ({ opacityValue }: { opacityValue?: string }) => {
    return (
      `hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) calc(var(--nextra-primary-lightness) + ${l}%)` +
      (opacityValue ? ` / ${opacityValue})` : ')')
    );
  };

/**
 * We explicitly do not use `import { createRequire } from 'node:module'` and
 * `const require = createRequire(import.meta.url)` because it works even without it.
 * E.g. storybook complains about cannot found `module` package
 */
const componentsPackageJson = require.resolve('@theguild/components/package.json', {
  /**
   * Paths to resolve module location from CWD. Without specifying, it picks incorrect
   * `@theguild/components`, also must be relative
   */
  paths: [process.cwd()],
});

const componentsPattern = path.relative(
  process.cwd(),
  path.posix.join(componentsPackageJson, '..', 'dist/**/*.js'),
);

const config = {
  darkMode: 'class',
  content: ['./{src,app}/**/*.{tsx,mdx}', './mdx-components.tsx', componentsPattern],
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
