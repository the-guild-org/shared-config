# Shared Config (by The Guild)

This repository is a collection of configurations, tools and examples, that demonstrate how The
Guild is using their libs.

We use the files stored here in our other repositories, to have a single point of truth for all
configurations/pipelines needed.

<details>
  <summary>Step 1: changesets</summary>
  
To setup automated release flow for your package, using `changesets`:

1. Create a monorepo, either by using `yarn` (v1) or `pnpm`.
2. Install and initialize the Changesets config by following these instructions:
   https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md (also make
   sure to install `@changesets/changelog-github`)

Make sure to adjust you Changesets config file, based on your repo setup:

```jsonc
{
  "$schema": "https://unpkg.com/@changesets/config@2.1.0/schema.json",
  "changelog": [
    "@changesets/changelog-github", // this will make nice output for changesets, with "thank you..." notes, and liks to the commits + references in PRs!
    { "repo": "guild-member/project-repo" } // Set the repo name here
  ],
  "commit": false,
  "linked": [],
  "access": "public",
  "baseBranch": "master", // change if needed
  "updateInternalDependencies": "patch",
  "ignore": ["website"] // change if needed
}
```

3. Configure your monorepo packages correctly, you should make sure to have the following in your
   `package.json`:

```json
{
  "publishConfig": {
    "directory": "dist",
    "access": "public"
  }
}
```

> If you are not using a bundler/build flow, make sure to change the `directory` value if needed.

4. Configure Changesets scripts for the release/PR flows. You should have a script called `release`,
   that basically prepares the package for publishing, and then call `changesets` CLI to do the
   actual publishing:

```json
{
  "scripts": {
    "release": "yarn build && changeset publish"
  }
}
```

5. Install Changesets Bot on your repo: https://github.com/apps/changeset-bot

</details>

<details>
  <summary>Step 2: Repository Settings</summary>

Configure GitHub Actions permissions: Go to repo Settings > Actions > General and make sure to
configure the following:

- `Actions permissions` should be set to `Allow all actions and reusable workflows`
- `Workflow permissions` should be set to `Read and write permissions`, and make sure the
  `Allow GitHub Actions to create and approve pull requests` option is active.

</details>

<details>
  <summary>Step 3: Unified secrets</summary>

You can create an NPM publishing token by using `npm token create`.

After creating your token, make sure to add it as part of your GitHub Actions Secrets (under repo
Settings). Name it `NPM_TOKEN`.

In addition, the shared pipelines are going to use `GITHUB_TOKEN` provided by GitHub Actions
runtime. You can customize it by creating a custom PAT token for the user you wish to use.

</details>

<details>
  <summary>Step 4: Automatic Stable Release</summary>

Create a GitHub Actions that refers to the workflow defined in this repo, along with your settings:

```yaml
name: release
on:
  push:
    branches:
      - master # change to main if needed

jobs:
  stable:
    uses: the-guild-org/shared-config/.github/workflows/release-stable.yml@main
    with:
      releaseScript: release # script to run as part of publish command
      nodeVersion: 18 # you can change if needed
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      npmToken: ${{ secrets.NPM_TOKEN }}
```

> By default, we use `aggregated` release mode.

</details>

<details>
  <summary>Step 5: Snapshot release for Pull Requests</summary>

To setup automated release flow for your package, using `changesets`, based on PR changes, use the
following setup:

Start by updating your changesets `config.json` to use the following:

```jsonc
{
  // ... other stuff
  "snapshot": {
    "useCalculatedVersion": true,
    "prereleaseTemplate": "{tag}-{datetime}-{commit}"
  }
}
```

> You can customize the canary release template, see:
> https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#prereleasetemplate-optional-string

Create a GitHub workflow (you can call it `pr.yaml`):

```yaml
name: pr
on:
  pull_request:
    branches:
      - master # change if needed

jobs:
  release:
    uses: the-guild-org/shared-config/.github/workflows/release-snapshot.yml@main
    with:
      npmTag: alpha
      buildScript: build
      nodeVersion: 18
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      npmToken: ${{ secrets.NPM_TOKEN }}
```

> You can choose the NPM tag of the release. We prefer using `alpha` or `canary` for PR-based
> releases.

</details>

<details>
  <summary>Step 6: Renovate</summary>
  
1. Install Renovate Bot on your repo: https://github.com/marketplace/renovate
2. Wait for Renovate to create the first setup PR and merge it. 
3. Create `renovate.json` config file in the repo, with the following:

```
{
  "extends": ["github>the-guild-org/shared-config:renovate"]
}
```

</details>

<details>
  <summary>Step 7: Automatic changesets for dependencies updates</summary>

To get automatic changesets created for Renovate PRs (and manual dependencies changes), add the
following GitHub Action workflow to your repo:

> Note: you can also add this to the existing `pr.yaml` if you are using the snapshot release.

```yaml
name: pr
on:
  pull_request:
    branches:
      - master # change if needed

jobs:
  dependencies:
    uses: the-guild-org/shared-config/.github/workflows/changesets-dependencies.yaml@main
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
```

</details>

<details>
  <summary>Step 9: ESLint/Prettier config</summary>
  
If you wish to use the unified config for eslint or prettier, following these instructions:

- eslint: https://github.com/the-guild-org/shared-config/tree/main/packages/eslint-config
- prettier: https://github.com/the-guild-org/shared-config/tree/main/packages/prettier-config

</details>

<details>
  <summary>Step 10: ESLint pipeline</summary>

If you wish to have a lint using ESLint and report the results back to GitHub, do the following:

1. Make sure your project has eslint installed and configured
2. Add `ci:lint` script with the following flags:
   `eslint --output-file eslint_report.json --format json` on top of your regular ESLint CLI flags.
3. Add a CI pipelines with the following:

```yml
name: test
on:
  pull_request:
    branches:
      - master
  push:
    branches:
      - master

jobs:
  lint:
    uses: the-guild-org/shared-config/.github/workflows/lint.yml@main
    with:
      script: yarn ci:lint
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
```

</details>

<details>
  <summary>Step 11: Shared pipelines</summary>

To get the most out of the shared pipelines, you can use the following to run scripts as part of
your CI process:

```yml
name: build
on:
  pull_request:
    branches:
      - master
  push:
    branches:
      - master

jobs:
  build:
    uses: the-guild-org/shared-config/.github/workflows/ci.yml@main
    with:
      script: yarn build
```

If our script is more complex and requires NodeJS version matrix, you can use this:

```yml
name: build
on:
  pull_request:
    branches:
      - master
  push:
    branches:
      - master

jobs:
  build:
    uses: the-guild-org/shared-config/.github/workflows/ci-node-matrix.yml@main
    with:
      script: yarn build
      nodeVersions: '[14,16,18]'
```

If your script requires more stuff, and you just want to avoid configuring NodeJS + Yarn + Caches,
you can just use the following to get started with your pipeline:

```yml
name: test
on:
  pull_request:
    branches:
      - master
  push:
    branches:
      - master

jobs:
  test:
    name: myScript
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - uses: the-guild-org/shared-config/setup@main
        name: setup env
        with:
          nodeVersion: 18
```

</details>

<details>
  <summary>(Optional) Setup Algolia search</summary>

We recommend setup Algolia to any The Guild project that provides documentation with Nextra.

  <br />

1. Install `@theguild/algolia`

```
yarn add -D @theguild/algolia
```

2. Configure Prettier

If Prettier or other tools are used, ensure to exclude the `website/algolia-lockfile.json` file.

3. Add Algolia credentials to repo secrets

Configure the following Github Actions secrets from your Algolia dashboard:

- `ALGOLIA_APP_ID`
- `ALGOLIA_ADMIN_API_KEY`
- `ALGOLIA_INDEX_NAME`

4. Add the Github Actions workflows

_PR workflow example_

```yml
name: pr
on:
  pull_request:
    branches:
      - master

jobs:
  algolia:
    uses: the-guild-org/shared-config/.github/workflows/algolia-integrity.yml@main
    with:
      domain: https://www.the-guild.dev/graphql/codegen/
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
```

_main branch workflow example_

```yml
name: release
on:
  push:
    branches:
      - master

jobs:
  algolia:
    uses: the-guild-org/shared-config/.github/workflows/algolia-publish.yml@main
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      algoliaAppId: ${{ secrets.ALGOLIA_APP_ID }}
      algoliaAdminApiKey: ${{ secrets.ALGOLIA_ADMIN_API_KEY }}
      algoliaIndexName: ${{ secrets.ALGOLIA_INDEX_NAME }}
    with:
      domain: https://www.the-guild.dev/graphql/codegen/
```

</details>

For the complete list of available options (`with: ...`), please refer to the
[workflow declaration](./github/workflows/algolia-integrity.yml).

If your project runs a node version different version of `18` or uses a package manager different
from `yarn`, please use the following options under the `with` block:

- `packageManager: "pnpm"`
- `nodeVersion: 16`
