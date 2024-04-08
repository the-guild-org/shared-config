import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'tailwind.config',
    entry: ['./src/tailwind.config.ts'],
    format: 'esm',
    dts: true,
    clean: true,
  },
  {
    name: 'postcss.config',
    entry: ['./src/postcss.config.ts'],
    // ESM postcss config isn't supported by Next.js at this moment
    format: 'cjs',
    dts: true,
    clean: true,
  },
]);
