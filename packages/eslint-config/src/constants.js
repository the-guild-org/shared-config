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

module.exports = {
  CODE_BLOCK: '**/*.md{,x}/*',
  CODE_FILE: '*.{,c,m}{j,t}s{,x}',
  RESTRICTED_SYNTAX,
  REACT_RESTRICTED_SYNTAX,
};
