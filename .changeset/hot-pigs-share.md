---
'@theguild/eslint-config': minor
---

new rules:

- `yoda`

- `unicorn/prefer-export-from`

- `promise/no-multiple-resolved`

- `unicorn/prefer-logical-operator-over-ternary`

- `@typescript-eslint/no-unused-expressions`

- `unicorn/no-negated-condition`

react:

fix `import/extensions`

- 'react/prop-types': 'off'
- 'react/jsx-boolean-value': 'error'
- 'react/hook-use-state': 'error'
- 'react/iframe-missing-sandbox': 'error'
- 'react/jsx-no-leaked-render': 'error'

forbid:

- `process.browser`

- restrict `isNaN` in favour of `Number.isNaN`
