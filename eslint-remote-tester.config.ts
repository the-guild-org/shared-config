/* eslint-disable import/no-default-export */
import { Config } from 'eslint-remote-tester';

const JSExtensions = ['.js', '.jsx', '.cjs', '.mjs', '.cjsx', '.mjsx'] as const;

const TSExtensions = ['.ts', '.tsx', '.cts', '.mts', '.ctsx', '.mtsx'] as const;

enum Repo {
  // Ecosystem
  Hive = 'kamilkisiela/graphql-hive',
  Yoga = 'dotansimha/graphql-yoga',
  Envelop = 'n1ru4l/envelop',
  Inspector = 'kamilkisiela/graphql-inspector',
  CodeGenerator = 'dotansimha/graphql-code-generator',
  Mesh = 'urigo/graphql-mesh',
  Tools = 'ardatan/graphql-tools',
  Modules = 'urigo/graphql-modules',
  ESLint = 'b2o5t/graphql-eslint',
  Config = 'kamilkisiela/graphql-config',
  Scalars = 'urigo/graphql-scalars',
  Shield = 'dimatill/graphql-shield',
  Swift = 'maticzav/swift-graphql',
  CLI = 'urigo/graphql-cli',
  SOFA = 'urigo/sofa',
  Stencil = 'ardatan/stencil-apollo',
  Angular = 'kamilkisiela/apollo-angular',
  WhatsApp = 'urigo/whatsapp-clone-tutorial',
  // Another Guild's repos
  Components = 'the-guild-org/the-guild-components',
  Website = 'the-guild-org/the-guild-website',
  SharedConfigs = 'the-guild-org/shared-config',
  TimeAgo = 'n1ru4l/react-time-ago',
  Bob = 'kamilkisiela/bob',
  DataLoader = 'graphql/dataloader',
  LiveQuery = 'n1ru4l/graphql-live-query',
  GraphiQL = 'graphql/graphiql',
  GraphQLOrg = 'graphql/graphql.github.io',
  GraphQLHTTP = 'graphql/graphql-http',
  GraphQLWS = 'enisdenjo/graphql-ws',
  GraphQLSSE = 'enisdenjo/graphql-sse',
  // Other
  Nextra = 'shuding/nextra',
  Satori = 'vercel/satori',
  NextJS = 'vercel/next.js',
}

const overrideConfig: Config['eslintrc'] = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
  },
  overrides: [
    {
      files: '**/tests/**',
      env: {
        jest: true,
      },
    },
  ],
  plugins: [
    'sonarjs',
    'unicorn',
    'import',
    'react',
    '@typescript-eslint',
    '@shopify',
    'n',
    'promise',
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        // ❌ process.browser
        selector:
          'ExpressionStatement[expression.object.name=process][expression.property.name=browser]',
        message: '`process.browser` is deprecated, use `!!globalThis.window`',
      },
      {
        // ❌ let { foo: {bar} } = baz
        selector:
          'VariableDeclarator[init.type!=AwaitExpression] > ObjectPattern[properties.length=1][properties.0.value.type=ObjectPattern]',
        message: 'Do not use nested destructuring.',
      },
      {
        // ❌ useMemo(…, [])
        selector:
          'CallExpression[callee.name=useMemo][arguments.1.type=ArrayExpression][arguments.1.elements.length=0]',
        message:
          "`useMemo` with an empty dependency array can't provide a stable reference, use `useRef` instead.",
      },
    ],
  },
};

const config: Config = {
  cache: true,
  extensions: [...JSExtensions, ...TSExtensions],
  repositories: Object.values(Repo),
  eslintrc: overrideConfig,
  pathIgnorePattern: `(${[
    'dev-test/githunt/flow.flow.js', // codegen
    'dev-test/test-schema/flow-types.flow.js', // codegen
    'packages/load/tests/loaders/schema/test-files/error.ts', // tools
    'action/index.js', // inspector
    '.yarn/releases/yarn-berry.cjs', // shield
    // swift
    '.yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs',
    '.yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs',
    '.yarn/plugins/@yarnpkg/plugin-typescript.cjs',
    // next.js
    'packages/next/src/compiled/babel/bundle.js',
    'packages/next/src/compiled/mini-css-extract-plugin/loader.js',
    'packages/next/src/compiled/undici/index.js',
    'packages/next/src/compiled/ws/index.js',
    'test/development/basic/hmr/components/parse-error.js',
    // dataloader
    'flow-typed/npm/jest_v24.x.x.js',
    'src/__tests__/abuse.test.js',
    'src/__tests__/browser.test.js',
    'src/__tests__/dataloader.test.js',
    'src/__tests__/oldbrowser.test.js',
    'src/__tests__/unhandled.test.js',
  ].join('|')})`,
  rulesUnderTesting: () => true,
};

export default config;
