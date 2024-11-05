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
        // (?<= from ")
        // Positive lookbehind asserts that the pattern we're trying to match is preceded by
        // ` from "`, but does not include ` from "` in the actual match.
        //
        // (?=";)
        // Positive lookahead asserts that the pattern is followed by `";`, but does not include
        // `";` in the match.
        const replaced = code.replaceAll(/(?<= from ")node:(.+)(?=";)/g, '$1');
        return { code: replaced };
      },
    },
  ],
});
