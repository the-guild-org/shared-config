# eslint-config-guild

Guild's ESLint shareable config for JavaScript/TypeScript/React projects.

## Install

For JavaScript/TypeScript projects

```sh
yarn add -D eslint eslint-config-guild
```

For React projects

```sh
yarn add -D eslint \
            eslint-config-guild \
            eslint-plugin-jsx-a11y \
            eslint-plugin-react \
            eslint-plugin-react-hooks
```

## Usage

Extend a `guild` config for JavaScript/TypeScript projects.

```js
// .eslintrc.cjs
module.exports = {
  extends: ['guild']
}
```

Additionally extend a `guild/react` for React projects.

```diff
// .eslintrc.cjs
module.exports = {
- extends: ['guild']
+ extends: ['guild', 'guild/react']
}
```
