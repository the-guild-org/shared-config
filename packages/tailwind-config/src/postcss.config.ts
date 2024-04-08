import { Config } from 'postcss-load-config';

const config: Config = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && { cssnano: {} }),
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
