import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'tailwind.config',
  entry: ['src'],
  format: 'esm',
  dts: true,
  clean: true,
  bundle: false,
  plugins: [
    {
      // Strip `node:` prefix from imports because Storybook complains about it
      name: 'strip-node-colon',
      renderChunk(code) {
        const replaced = code.replaceAll(/ from "node:(?<moduleName>.*?)";/g, matched =>
          matched.replace('node:', ''),
        );
        return { code: replaced };
      },
    },
  ],
});
