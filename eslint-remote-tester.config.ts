import type { Config } from 'eslint-remote-tester';

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
}

enum JSExtension {
  js = 'js',
  jsx = 'jsx',
  cjs = 'cjs',
  mjs = 'mjs',
  cjsx = 'cjsx',
  mjsx = 'mjsx',
}

enum TSExtension {
  ts = 'ts',
  tsx = 'tsx',
  cts = 'cts',
  mts = 'mts',
  ctsx = 'ctsx',
  mtsx = 'mtsx',
}

const config: Config = {
  repositories: Object.values(Repo),
  extensions: [...Object.keys(JSExtension), ...Object.keys(TSExtension)],
  eslintrc: {
    root: true,
    extends: ['eslint:recommended'],
    rules: {
      'no-console': 'error',
    },
  },
};

export default config;
