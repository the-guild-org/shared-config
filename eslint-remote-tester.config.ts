/* eslint-disable import/no-default-export */
import type { Config } from 'eslint-remote-tester';
import type { Linter } from 'eslint';

const JSExtensions = ['js', 'jsx', 'cjs', 'mjs', 'cjsx', 'mjsx'] as const;

const TSExtensions = ['ts', 'tsx', 'cts', 'mts', 'ctsx', 'mtsx'] as const;

enum Repo {
  // Ecosystem
  // Hive = 'the-guild-org/graphql-hive', TODO: enable after will be OpenSourced
  Yoga = 'dotansimha/graphql-yoga',
  Envelop = 'dotansimha/envelop',
  Inspector = 'kamilkisiela/graphql-inspector',
  CodeGenerator = 'dotansimha/graphql-code-generator',
  Mesh = 'urigo/graphql-mesh',
  Tools = 'ardatan/graphql-tools',
  Modules = 'urigo/graphql-modules',
  ESLint = 'b2o5t/graphql-eslint',
  Config = 'kamilkisiela/graphql-config',
  Scalars = 'urigo/graphql-scalars',
  Shield = 'maticzav/graphql-shield',
  Swift = 'maticzav/swift-graphql',
  CLI = 'urigo/graphql-cli',
  SOFA = 'urigo/sofa',
  Stencil = 'ardatan/stencil-apollo',
  Angular = 'kamilkisiela/apollo-angular',
  WhatsApp = 'urigo/whatsapp-clone-tutorial',
  // Another Guild's repos
  Components = 'the-guild-org/the-guild-components',
  Docs = 'the-guild-org/the-guild-docs',
  Website = 'the-guild-org/the-guild-website',
  SharedConfigs = 'the-guild-org/shared-config',
  TimeAgo = 'n1ru4l/react-time-ago',
  Bob = 'kamilkisiela/bob',
  DataLoader = 'graphql/dataloader',
  LiveQuery = 'n1ru4l/graphql-live-query',
}

const overrideConfig: Linter.Config = {
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
  plugins: ['sonarjs', 'unicorn', 'import', 'react', '@typescript-eslint', '@shopify', 'n', 'promise'],
  rules: {
    'no-unreachable-loop': 'error',
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
    '.yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs', // swift
    '.yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs', // swift
    '.yarn/plugins/@yarnpkg/plugin-typescript.cjs', // swift
  ].join('|')})`,
};

export default config;
