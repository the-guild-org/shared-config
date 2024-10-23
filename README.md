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
    "@changesets/changelog-github", // this will make nice output for changesets, with "thank you..." notes, and links to the commits + references in PRs!
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
      - name: checkout
        uses: actions/checkout@v3
      - uses: the-guild-org/shared-config/setup@v1
        name: set up env
        with:
          node-version-file: .node-version
```

</details>

<details>
  <summary>Step 12: `rc` relases</summary>

To ship `rc` releases from `Upcoming Release Changes` PRs, do the following first:

1. Ensure `GUILD_BOT_TOKEN` is set on your repository (or, a PAT created from a bot/user account).
2. Change the stable release pipeline, and configure it to use `GUILD_BOT_TOKEN`:

```yml
jobs:
  stable:
    uses: the-guild-org/shared-config/.github/workflows/release-stable.yml@main
    with:
      releaseScript: release
      nodeVersion: 18
    secrets:
      githubToken: ${{ secrets.GUILD_BOT_TOKEN }} # HERE
      npmToken: ${{ secrets.NPM_TOKEN }}
```

3. Now, duplicate your snapshot release pipeline, add the conditions, and make sure to add the
   required configuration for that kind of pipelines:

```yaml
jobs:
  alpha: # Assuming this is your exisisting alpha release pipeline from previous step
    uses: the-guild-org/shared-config/.github/workflows/release-snapshot.yml@main
    if: ${{ github.event.pull_request.title != 'Upcoming Release Changes' }} # ADD THIS
    with:
      npmTag: alpha
      buildScript: build
      nodeVersion: 18
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      npmToken: ${{ secrets.NPM_TOKEN }}

  release-candidate: # This is a new one
    uses: the-guild-org/shared-config/.github/workflows/release-snapshot.yml@main
    if: ${{ github.event.pull_request.title == 'Upcoming Release Changes' }} # ADD THIS, note that the condition is different
    with:
      npmTag: rc # Here we are using a different tag
      restoreDeletedChangesets: true # Make sure to add this flag, in order to make changesets visible to the release pipeline!
      buildScript: build
      nodeVersion: 18
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      npmToken: ${{ secrets.NPM_TOKEN }}
```

</details>

<details>
  <summary> Step 13: Trackback</summary>

Trackback is a in-house tool for The Guild repositories, that allows up to easily test `rc`
releases.

To use that, following these instructions:

1. Ensure you have `GUILD_BOT_TOKEN` set.
2. Find the workflows in your repositories that might be effected by changes. Usually `build` /
   `typecheck` and `test` are relevant here. Also more complicated workflows, such as integration
   tests. Add this at the end of the workflow (or, after the importand command):

```yaml
- uses: the-guild-org/shared-config/release-trackback@main
  if: ${{ always() }}} # Important!
  with:
    token: ${{ secrets.GUILD_BOT_TOKEN }} # Make sure to use the Guild bot token here
    relevantPackages:
      | # Here you can specify a list of explicit dependencies, or using "*" matcher.
      @theguild/*
      @whatwg-node/*
```

3. To make sure your repository accepts Renovate configuration for alpha release, use the following
   snippet in your `renovate.json` config file:

```json
{
  "groupName": "whatwg-node",
  "matchPackageNames": ["@whatwg-node/*"],
  "prPriority": 21,
  "ignoreUnstable": false,
  "respectLatest": false,
  "allowedVersions": "/^([0-9]+).([0-9]+)(?:.([0-9]+))?(-rc-.+)?$/"
}
```

4. Now, if a **Renovate PR** with **`rc`** release, for a depenendecies declared under
   `relevantPackages` will fail your workflow, you'll get a comment on `Upcoming Release Changes` PR
   in the source repository!

</details>

<details>
  <summary>Step 13: (Optional) Setup Algolia search</summary>

We recommend setup Algolia to any The Guild project that provides documentation with Nextra.

  <br />

1. Install `@theguild/algolia`

```
yarn add -D @theguild/algolia
```

2. Configure Prettier

If Prettier or other tools are used, ensure to exclude the `website/algolia-lockfile.json` file.

3. Add Algolia credentials to repo secrets

Configure the following GitHub Actions secrets from your Algolia dashboard:

- `ALGOLIA_ADMIN_API_KEY`

4. Add the GitHub Actions workflows

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
      algoliaAdminApiKey: ${{ secrets.ALGOLIA_ADMIN_API_KEY }}
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
