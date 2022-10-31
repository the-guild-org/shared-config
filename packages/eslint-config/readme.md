# @theguild/eslint-config

Guild's ESLint shareable configs for linting JavaScript/TypeScript/React projects.

## Install

For JavaScript/TypeScript projects

```sh
pnpm add -D eslint @theguild/eslint-config
```

For React projects

```sh
pnpm add -D eslint \
  @theguild/eslint-config \
  eslint-plugin-jsx-a11y \
  eslint-plugin-react \
  eslint-plugin-react-hooks
```

## Usage

Extend a `@theguild` config for JavaScript/TypeScript projects.

```js
// .eslintrc.cjs
module.exports = {
  extends: ['@theguild']
}
```

Additionally extend a `@theguild/eslint-config/react` config for React projects.

```diff
// .eslintrc.cjs
module.exports = {
- extends: ['@theguild']
+ extends: ['@theguild', '@theguild/eslint-config/react']
}
```
