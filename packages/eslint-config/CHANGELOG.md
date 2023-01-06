# @theguild/eslint-config

## 0.4.2

### Patch Changes

- [#144](https://github.com/the-guild-org/shared-config/pull/144)
  [`2e7099a`](https://github.com/the-guild-org/shared-config/commit/2e7099a27f74c1f9bacf38e2488b1fc547b7eaed)
  Thanks [@B2o5T](https://github.com/B2o5T)! - add `varsIgnorePattern: '^_'` for
  `@typescript-eslint/no-unused-vars` forbid lodash/isString.js, lodash/isArray.js,
  lodash/flatten.js, lodash/compact.js, lodash/identity.js

## 0.4.1

### Patch Changes

- [#142](https://github.com/the-guild-org/shared-config/pull/142)
  [`b09a4ce`](https://github.com/the-guild-org/shared-config/commit/b09a4cef20c7aab5af3267803fdad323814717fe)
  Thanks [@B2o5T](https://github.com/B2o5T)! - ignore `import/no-default-export` for
  `website/theme.config.tsx` treat `.vscode/launch.json` as jsonc ignore `import/extensions` for
  Markdown code blocks ignore filename for `.github/FUNDING.yml` put imported filename extensions
  `graphql|css|png|svg|jpe?g|webp|avif` always last

## 0.4.0

### Minor Changes

- [#122](https://github.com/the-guild-org/shared-config/pull/122)
  [`cb4c789`](https://github.com/the-guild-org/shared-config/commit/cb4c789053e52d4af6e210fb9c6bed9c710988f2)
  Thanks [@B2o5T](https://github.com/B2o5T)! - run react rule on js/ts files, since it can be react
  hook without JSX extension

### Patch Changes

- [#122](https://github.com/the-guild-org/shared-config/pull/122)
  [`cb4c789`](https://github.com/the-guild-org/shared-config/commit/cb4c789053e52d4af6e210fb9c6bed9c710988f2)
  Thanks [@B2o5T](https://github.com/B2o5T)! - dependencies updates:

  - Updated dependency
    [`@typescript-eslint/eslint-plugin@^5.45.1` ↗︎](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin/v/5.45.1)
    (from `^5.42.0`, in `dependencies`)
  - Updated dependency
    [`@typescript-eslint/parser@^5.45.1` ↗︎](https://www.npmjs.com/package/@typescript-eslint/parser/v/5.45.1)
    (from `^5.42.0`, in `dependencies`)
  - Updated dependency
    [`eslint-plugin-n@^15.6.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-n/v/15.6.0) (from
    `^15.4.0`, in `dependencies`)
  - Updated dependency
    [`eslint-plugin-unicorn@^45.0.1` ↗︎](https://www.npmjs.com/package/eslint-plugin-unicorn/v/45.0.1)
    (from `^45.0.0`, in `dependencies`)
  - Added dependency
    [`eslint-plugin-jsx-a11y@^6.6.1` ↗︎](https://www.npmjs.com/package/eslint-plugin-jsx-a11y/v/6.6.1)
    (to `dependencies`)
  - Added dependency
    [`eslint-plugin-mdx@^2.0.5` ↗︎](https://www.npmjs.com/package/eslint-plugin-mdx/v/2.0.5) (to
    `dependencies`)
  - Added dependency
    [`eslint-plugin-react@^7.31.11` ↗︎](https://www.npmjs.com/package/eslint-plugin-react/v/7.31.11)
    (to `dependencies`)
  - Added dependency
    [`eslint-plugin-react-hooks@^4.6.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-react-hooks/v/4.6.0)
    (to `dependencies`)

- [#124](https://github.com/the-guild-org/shared-config/pull/124)
  [`1092362`](https://github.com/the-guild-org/shared-config/commit/1092362499a1462da764d65341b9cc7cc3208b62)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:
  - Updated dependency
    [`eslint-plugin-sonarjs@^0.17.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-sonarjs/v/0.17.0)
    (from `^0.16.0`, in `dependencies`)

## 0.3.1

### Patch Changes

- [#108](https://github.com/the-guild-org/shared-config/pull/108)
  [`a00a18a`](https://github.com/the-guild-org/shared-config/commit/a00a18ad8af6c988b79208bc6ebc05dd28fd373a)
  Thanks [@B2o5T](https://github.com/B2o5T)! - config adjustments

## 0.3.0

### Minor Changes

- [#102](https://github.com/the-guild-org/shared-config/pull/102)
  [`2375767`](https://github.com/the-guild-org/shared-config/commit/237576757b30002fc190f5b0ef397b76443c2fff)
  Thanks [@B2o5T](https://github.com/B2o5T)! - add mdx/md linting

- [#99](https://github.com/the-guild-org/shared-config/pull/99)
  [`83fd0d8`](https://github.com/the-guild-org/shared-config/commit/83fd0d8636ea2975ead28fa2991e0d72f0d666f2)
  Thanks [@B2o5T](https://github.com/B2o5T)! - update eslint config, add new rules

### Patch Changes

- [#102](https://github.com/the-guild-org/shared-config/pull/102)
  [`2375767`](https://github.com/the-guild-org/shared-config/commit/237576757b30002fc190f5b0ef397b76443c2fff)
  Thanks [@B2o5T](https://github.com/B2o5T)! - dependencies updates:

  - Updated dependency
    [`@rushstack/eslint-patch@^1.2.0` ↗︎](https://www.npmjs.com/package/@rushstack/eslint-patch/v/1.2.0)
    (from `^1.1.4`, in `dependencies`)
  - Updated dependency
    [`@typescript-eslint/eslint-plugin@^5.42.0` ↗︎](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin/v/5.42.0)
    (from `^5.36.2`, in `dependencies`)
  - Updated dependency
    [`@typescript-eslint/parser@^5.42.0` ↗︎](https://www.npmjs.com/package/@typescript-eslint/parser/v/5.42.0)
    (from `^5.36.2`, in `dependencies`)
  - Updated dependency
    [`eslint-plugin-n@^15.4.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-n/v/15.4.0) (from
    `^15.3.0`, in `dependencies`)
  - Updated dependency
    [`eslint-plugin-promise@^6.1.1` ↗︎](https://www.npmjs.com/package/eslint-plugin-promise/v/6.1.1)
    (from `^6.0.1`, in `dependencies`)
  - Updated dependency
    [`eslint-plugin-unicorn@^44.0.2` ↗︎](https://www.npmjs.com/package/eslint-plugin-unicorn/v/44.0.2)
    (from `^44.0.0`, in `dependencies`)
  - Added dependency
    [`eslint-plugin-jsonc@^2.5.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-jsonc/v/2.5.0) (to
    `dependencies`)
  - Added dependency
    [`eslint-plugin-yml@^1.2.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-yml/v/1.2.0) (to
    `dependencies`)

- [#115](https://github.com/the-guild-org/shared-config/pull/115)
  [`6550d7a`](https://github.com/the-guild-org/shared-config/commit/6550d7a98dce7bb5cd1d7137800ec75c91954a3e)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:

  - Updated dependency
    [`eslint-plugin-unicorn@^45.0.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-unicorn/v/45.0.0)
    (from `^44.0.2`, in `dependencies`)

- [#99](https://github.com/the-guild-org/shared-config/pull/99)
  [`83fd0d8`](https://github.com/the-guild-org/shared-config/commit/83fd0d8636ea2975ead28fa2991e0d72f0d666f2)
  Thanks [@B2o5T](https://github.com/B2o5T)! - dependencies updates:

  - Added dependency
    [`eslint-plugin-n@^15.3.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-n/v/15.3.0) (to
    `dependencies`)
  - Added dependency
    [`eslint-plugin-simple-import-sort@^8.0.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-simple-import-sort/v/8.0.0)
    (to `dependencies`)

## 0.2.0

### Minor Changes

- [#77](https://github.com/the-guild-org/shared-config/pull/77)
  [`d63132c`](https://github.com/the-guild-org/shared-config/commit/d63132c099aab495caa67b3050557b42a5f1b938)
  Thanks [@saihaj](https://github.com/saihaj)! - require to have `.js` extensions since when
  bundling with `bob` we need all the extensions to be explicit.

## 0.1.2

### Patch Changes

- [#63](https://github.com/the-guild-org/shared-config/pull/63)
  [`6769c59`](https://github.com/the-guild-org/shared-config/commit/6769c596bf13bd1314a4fc12e2dd105de5c82f55)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:

  - Updated dependency
    [`eslint-plugin-unicorn@^44.0.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-unicorn/v/44.0.0)
    (from `^43.0.2`, in `dependencies`)

- [#73](https://github.com/the-guild-org/shared-config/pull/73)
  [`570f65a`](https://github.com/the-guild-org/shared-config/commit/570f65a26e22049abc1a5a27c7f3ccb5f39d8e7a)
  Thanks [@B2o5T](https://github.com/B2o5T)! - add `package.json` to `exports` field

## 0.1.1

### Patch Changes

- [#68](https://github.com/the-guild-org/shared-config/pull/68)
  [`97edf94`](https://github.com/the-guild-org/shared-config/commit/97edf94a4b5d77dee80381fe5395d96f5c6db13d)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:
  - Updated dependency
    [`eslint-plugin-sonarjs@^0.16.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-sonarjs/v/0.16.0)
    (from `^0.15.0`, in `dependencies`)

## 0.1.0

### Minor Changes

- [#50](https://github.com/the-guild-org/shared-config/pull/50)
  [`3f642fd`](https://github.com/the-guild-org/shared-config/commit/3f642fd029f946fe3013066b6c1545507ffbeba5)
  Thanks [@B2o5T](https://github.com/B2o5T)! - update deps

### Patch Changes

- [#50](https://github.com/the-guild-org/shared-config/pull/50)
  [`3f642fd`](https://github.com/the-guild-org/shared-config/commit/3f642fd029f946fe3013066b6c1545507ffbeba5)
  Thanks [@B2o5T](https://github.com/B2o5T)! - dependencies updates:

  - Updated dependency
    [`@rushstack/eslint-patch@^1.1.4` ↗︎](https://www.npmjs.com/package/@rushstack/eslint-patch/v/null)
    (from `^1.1.3`, in `dependencies`)
  - Updated dependency
    [`@typescript-eslint/eslint-plugin@^5.36.2` ↗︎](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin/v/null)
    (from `^5.23.0`, in `dependencies`)
  - Updated dependency
    [`@typescript-eslint/parser@^5.36.2` ↗︎](https://www.npmjs.com/package/@typescript-eslint/parser/v/null)
    (from `^5.23.0`, in `dependencies`)
  - Updated dependency
    [`eslint-plugin-promise@^6.0.1` ↗︎](https://www.npmjs.com/package/eslint-plugin-promise/v/null)
    (from `^6.0.0`, in `dependencies`)
  - Updated dependency
    [`eslint-plugin-unicorn@^43.0.2` ↗︎](https://www.npmjs.com/package/eslint-plugin-unicorn/v/null)
    (from `^42.0.0`, in `dependencies`)

## 0.0.2

### Patch Changes

- [#26](https://github.com/the-guild-org/shared-config/pull/26)
  [`d650d86`](https://github.com/the-guild-org/shared-config/commit/d650d86fe164f52b17a0486ab8fcf721b205235e)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:

  - Updated dependency
    [`eslint-plugin-sonarjs@^0.15.0` ↗︎](https://www.npmjs.com/package/eslint-plugin-sonarjs/v/^0.15.0)
    (was `^0.13.0`, in `dependencies`)

## 0.0.1

### Patch Changes

- f86543d: first alpha
