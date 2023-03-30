const RESTRICTED_SYNTAX = [
  {
    // ❌ readFile(…, { encoding: … })
    selector: `CallExpression[callee.name=/readFileSync|readFile|writeFileSync|writeFile/] > .arguments:last-child[type=ObjectExpression][properties.length=1] Property[key.name=encoding]`,
    message: `Specify encoding as last argument instead of object with encoding key`,
  },
  {
    // ❌ readFile(…, {})
    selector: `CallExpression[callee.name=/readFileSync|readFile|writeFileSync|writeFile/] > .arguments:last-child[type=ObjectExpression][properties.length=0]`,
    message: 'Specify encoding as last argument',
  },
  {
    // ❌ readFileSync(…).toString(…)
    selector: `CallExpression[callee.name=readFileSync][parent.property.name=toString]`,
    message: `toString is redundant, specify encoding as last argument`,
  },
  {
    // ❌ ….readFile(…, { encoding: … })
    selector: `CallExpression[callee.type=MemberExpression][callee.property.name=/readFileSync|readFile|writeFileSync|writeFile/] > .arguments:last-child[type=ObjectExpression][properties.length=1] Property[key.name=encoding]`,
    message: `Specify encoding as last argument instead of object with encoding key`,
  },
  {
    // ❌ ….readFile(…, {})
    selector: `CallExpression[callee.type=MemberExpression][callee.property.name=/readFileSync|readFile|writeFileSync|writeFile/] > .arguments:last-child[type=ObjectExpression][properties.length=0]`,
    message: 'Specify encoding as last argument',
  },
  {
    // ❌ Boolean(…)
    selector: 'CallExpression[callee.name=Boolean][arguments.1.elements.length!=0]',
    message:
      'Prefer `!!…` over `Boolean(…)` because TypeScript infers a narrow literal boolean `type: true` instead of `type: boolean`.',
  },
  {
    // ❌ process.browser
    selector:
      'ExpressionStatement[expression.object.name=process][expression.property.name=browser]',
    message: '`process.browser` is deprecated, use `!!globalThis.window`',
  },
  // {
  //   // ❌ let { foo: { bar } } = baz
  //   // ✅ let { bar } = baz.foo
  //   // ✅ let { foo: { bar } } = await baz
  //   selector:
  //     'VariableDeclarator[init.type!=AwaitExpression] > ObjectPattern[properties.length=1][properties.0.value.type=ObjectPattern]',
  //   message: 'Do not use nested destructuring.',
  // },
];

const REACT_RESTRICTED_SYNTAX = [
  ...RESTRICTED_SYNTAX,
  {
    // ❌ useMemo(…, [])
    selector:
      'CallExpression[callee.name=useMemo][arguments.1.type=ArrayExpression][arguments.1.elements.length=0]',
    message:
      "`useMemo` with an empty dependency array can't provide a stable reference, use `useRef` instead.",
  },
];

const RESTRICTED_GLOBALS = ['stop', { name: 'isNaN', message: 'Use Number.isNaN instead' }];

const RESTRICTED_MODULES = [
  { name: 'axios', message: 'Use `fetch/node-fetch` instead.' },
  { name: 'moment', message: 'Use `dayjs/date-fns` instead.' },
  { name: 'classnames', message: 'Use `clsx` instead because he is faster.' },
  { name: 'lodash/isString.js', message: "Use `typeof yourVar === 'string'` instead." },
  { name: 'lodash/isArray.js', message: 'Use `Array.isArray` instead.' },
  { name: 'lodash/flatten.js', message: 'Use `Array#flat()` instead.' },
  { name: 'lodash/compact.js', message: 'Use `Array#filter(Boolean)` instead.' },
  { name: 'lodash/identity.js', message: 'Use `(value) => value` instead.' },
];

module.exports = {
  CODE_BLOCK: '**/*.md{,x}/*',
  CODE_FILE: '*.{,c,m}{j,t}s{,x}',
  TS_FILE: '*.{,c,m}ts{,x}',
  RESTRICTED_GLOBALS,
  RESTRICTED_MODULES,
  RESTRICTED_SYNTAX,
  REACT_RESTRICTED_SYNTAX,
};
