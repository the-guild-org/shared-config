---
'@theguild/tailwind-config': minor
---

- use ESM config for `postcss`
- use `postcss-lightningcss` instead of `autoprefixer` and `cssnano`
- BREAKING CHANGE: require `peerDependencies` to be installed `postcss-import`, `postcss-lightningcss` and `tailwindcss`
- update tailwindcss `content` property to include Next.js' `app` directory
- add `type: "module"` in `package.json` 
