# Shared Config (by The Guild)

This repository is a collection of configurations, tools and examples, that demonstrate how The Guild is using their libs.

We use the files stored here in our other repositories, to have a single point of truth for all configurations/pipelines needed. 


<details>
  <summary>Step 1: changesets</summary>
  
To setup automated release flow for your package, using `changesets`:

1. Create a monorepo, either by using `yarn` (v1) or `pnpm`.
2. Install and initialize the Changesets config by following these instructions: https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md (also make sure to install `@changesets/changelog-github`) 

Make sure to adjust you Changesets config file, based on your repo setup:

```json
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

3. Configure your monorepo packages correctly, you should make sure to have the following in your `package.json`:

```json
  "publishConfig": {
    "directory": "dist",
    "access": "public"
  },
```

> If you are not using a bundler/build flow, make sure to change the `directory` value if needed.

4. Configure Changesets scripts for the release/PR flows. You should have a script called `release`, that basically prepares the package for publishing, and then call `changesets` CLI to do the actual publishing:

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

Configure GitHub Actions permissions: Go to repo Settings > Actions > General and make sure to configure the following:

  - `Actions permissions` should be set to `Allow all actions and reusable workflows`
  - `Workflow permissions` should be set to `Read and write permissions`, and make sure the `Allow GitHub Actions to create and approve pull requests` option is active. 

</details>

<details>
  <summary>Step 3: Unified secrets</summary>

You can create an NPM publishing token by using `npm token create`. 

After creating your token, make sure to add it as part of your GitHub Actions Secrets (under repo Settings). Name it `NPM_TOKEN`.

In addition, the shared pipelines are going to use `GITHUB_TOKEN` provided by GitHub Actions runtime. You can customize it by creating a custom PAT token for the user you wish to use.

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

To setup automated release flow for your package, using `changesets`, based on PR changes, use the following setup:

Start by updating your changesets `config.json` to use the following:

```json
{
  // ... other stuff ...
  "snapshot": {
    "useCalculatedVersion": true,
    "prereleaseTemplate": "{tag}-{datetime}-{commit}"
  }
}
```

> You can customize the canary release template, see: https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#prereleasetemplate-optional-string

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

> You can choose the NPM tag of the release. We prefer using `alpha` or `canary` for PR-based releases. 

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
  

To get automatic changesets created for Renovate PRs (and manual dependencies changes), add the following GitHub Action workflow to your repo:

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
