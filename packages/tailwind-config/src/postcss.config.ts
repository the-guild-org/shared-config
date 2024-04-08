import { Config } from 'postcss-load-config';

const config: Config = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && { cssnano: {} }),
  },
};

export default config;
export { type Config };
