# @theguild/eslint-config

Guild's ESLint shareable configs for linting JavaScript/TypeScript/React projects.

## Install

For JavaScript/TypeScript projects

```sh
pnpm add -D eslint @theguild/eslint-config
```

## Usage

Extend a `@theguild` config for JavaScript/TypeScript projects.

```js
// .eslintrc.cjs
module.exports = {
  extends: ['@theguild']
}
```

### React Config

Extend a `@theguild/eslint-config/react` config for React projects.

```js
// .eslintrc.cjs
module.exports = {
  extends: ['@theguild/eslint-config/react']
}
```

### MDX/Markdown Config

Extend a `@theguild/eslint-config/mdx` config for `.md`/`.mdx` files.

```js
// .eslintrc.cjs
module.exports = {
  extends: ['@theguild/eslint-config/mdx']
}
```

### JSON Config

Extend a `@theguild/eslint-config/json` config for `.json`/`.jsonc`/`.json5` files.

```js
// .eslintrc.cjs
module.exports = {
  extends: ['@theguild/eslint-config/json']
}
```

### YAML Config

Extend a `@theguild/eslint-config/yml` config for `.yml`/`.yaml` files.

```js
// .eslintrc.cjs
module.exports = {
  extends: ['@theguild/eslint-config/yml']
}
```
