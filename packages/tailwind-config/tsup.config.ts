import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'tailwind.config',
  entry: ['src'],
  format: 'esm',
  dts: true,
  clean: true,
  bundle: false,
});
