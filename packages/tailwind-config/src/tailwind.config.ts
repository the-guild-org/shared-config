import path from 'node:path';
import { type Config } from 'tailwindcss';
import tailwindContainerQueries from '@tailwindcss/container-queries';
import { hiveColors } from './hive-colors.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- tailwindcss types are incorrect
const makePrimaryColor: any =
  (val: number) =>
  ({ opacityValue }: { opacityValue?: string }): string => {
    const h = 'var(--nextra-primary-hue)';
    const s = 'var(--nextra-primary-saturation)';
    const _l = 'var(--nextra-primary-lightness)';
    const l = val ? `calc(${_l} + ${val}%)` : _l;
    return 'hsl(' + h + s + l + (opacityValue ? ` / ${opacityValue}` : '') + ')';
  };

function getComponentsPatterns() {
  try {
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

    return [
      path.relative(process.cwd(), path.posix.join(componentsPackageJson, '..', 'dist/**/*.js')),
    ];
  } catch {
    console.warn("Can't find `@theguild/components` package.");
    return [];
  }
}

const config = {
  /**
   * Same as `class`, but with the ability to have light-only sections in dark mode.
   * @see https://github.com/tailwindlabs/tailwindcss/pull/12717/files#diff-cf9185e083748e39c6940d3ad337df23b0ecbbd70b9550f596de7cf4b4668bcfR263-R273
   */
  darkMode: ['variant', '&:not(.light *)'],
  content: [
    './{src,app}/**/*.{tsx,mdx}',
    './mdx-components.tsx',
    './content/**/*.{md,mdx}',
    './theme.config.tsx', // Still needed for Nextra 3 websites.
    ...getComponentsPatterns(),
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
          50: makePrimaryColor(52),
          100: makePrimaryColor(49),
          200: makePrimaryColor(41),
          300: makePrimaryColor(32),
          400: makePrimaryColor(21),
          500: makePrimaryColor(5),
          600: makePrimaryColor(0),
          700: makePrimaryColor(-6),
          750: makePrimaryColor(-10),
          800: makePrimaryColor(-13),
          900: makePrimaryColor(-21),
          1000: makePrimaryColor(-33),
        },
      },
    },
  },
  plugins: [tailwindContainerQueries],
} satisfies Config;

export default config;
export { type Config };
