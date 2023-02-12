/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-console, import/extensions */
import * as core from '@actions/core';
import * as github from '@actions/github';
import { findComment } from './gh-utils';
import {
  createCommentBody,
  extractChangedPackages,
  filterRelevantPackages,
  starMatch,
} from './utils';

const uniqueCommentKey = (salt: string) => `<!-- trackback:${salt} -->`;

async function run(): Promise<void> {
  try {
    if (github.context.eventName !== 'pull_request') {
      core.warning(
        `Trackback was executed on ${github.context.eventName} event, but it only runs on pull_request events.`,
      );

      return;
    }

    const jobStatus = core.getInput('jobStatus') as 'success' | 'failure' | 'cancelled';

    if (!['success', 'failure', 'cancelled'].includes(jobStatus)) {
      return core.setFailed(
        `Invalid jobStatus provided: "${jobStatus}", Please use "success" or "failure" as value.`,
      );
    }

    if (jobStatus === 'cancelled') {
      core.warning(
        `Trackback was executed on "${jobStatus}" job, but we can't do anything in such case.`,
      );

      return;
    }

    const relevantPackages: string[] = core
      .getInput('relevantPackages', { required: true })
      .split('\n')
      .map(v => v.trim());
    const prOwners: string[] = core
      .getInput('prOwners', { required: true })
      .split('\n')
      .map(v => v.trim());
    const relevantTags: string[] = core
      .getInput('prereleaseTag', { required: true })
      .split('\n')
      .map(v => v.trim());

    const ghToken = core.getInput('token', { required: false }) || process.env.GITHUB_TOKEN;

    if (!ghToken) {
      return core.setFailed(
        `No token provided. Please set the GITHUB_TOKEN environment variable, or use "token" input.`,
      );
    }
    const octokit = github.getOctokit(ghToken);
    const sender = github.context.payload.sender?.login;

    if (!sender || !prOwners.includes(sender)) {
      core.warning(
        `Trackback was executed by "${sender}", but only runs on ${prOwners.join(', ')}.'`,
      );

      return;
    }

    const changedPackages = extractChangedPackages(github.context.payload.pull_request?.body || '');
    const relevantChanges = filterRelevantPackages(relevantPackages, changedPackages);
    core.debug(`Changed packages: ${JSON.stringify(changedPackages, null, 2)}`);
    core.debug(`Relevant packages: ${JSON.stringify(relevantChanges, null, 2)}`);

    if (relevantChanges.length === 0) {
      core.warning(`No relevant packages were changed in this PR. Nothing to do here.`);

      return;
    }

    const result = await Promise.all(
      relevantChanges.map(async change => {
        const matchesPrerelease = change.to?.prerelease.find(prerelease =>
          relevantTags.find(t => starMatch(t, String(prerelease))),
        );

        if (!matchesPrerelease) {
          core.warning(`Package ${change.package} was not updated to a prerelease version.`);

          return { package: change.package, result: 'skipped-no-prerelease' };
        }

        const prereleaseParts = String(matchesPrerelease).split('-');

        if (prereleaseParts.length !== 3) {
          core.warning(
            `Package ${
              change.package
            } has an invalid prerelease tag (${change.to?.format()}), expected one of: ${relevantTags.join(
              '/',
            )} with an additional "salt-commitId" suffix.`,
          );

          return { package: change.package, result: 'skipped-invalid-prerelease' };
        }

        const prereleaseCommitId = prereleaseParts[2];
        const queryVariables = {
          owner: change.repository.owner,
          repo: change.repository.repo,
          commitShort: prereleaseCommitId,
        };

        console.log('trying to match commit to PR, parameters:', queryVariables);

        const commitAndPr: any = await octokit.graphql(
          /* GraphQL */ `
            query commitAndPr($owner: String!, $repo: String!, $commitShort: String!) {
              repository(owner: $owner, name: $repo) {
                object(expression: $commitShort) {
                  ... on Commit {
                    id
                    message
                    associatedPullRequests(first: 1) {
                      nodes {
                        number
                        title
                        author {
                          login
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          queryVariables,
        );

        const relevantPr =
          commitAndPr?.repository?.object?.associatedPullRequests?.nodes?.[0]?.number;

        console.log('Relevant PR result:', relevantPr);

        if (!relevantPr) {
          core.warning(
            `Package ${
              change.package
            } has a prerelease tag (${change.to?.format()}), but the commit was not associated with a PR in the upstream repo (${
              change.repository.owner
            }/${change.repository.repo}).`,
          );

          return { package: change.package, result: 'skipped-no-pr' };
        }

        const uniqueKey = uniqueCommentKey(change.package);
        const existingComment = await findComment(octokit, {
          repo: queryVariables.repo,
          owner: queryVariables.owner,
          issueNumber: relevantPr,
          bodyIncludes: uniqueKey,
        });

        console.log('tried to find existing comment', {
          repo: queryVariables.repo,
          owner: queryVariables.owner,
          issueNumber: relevantPr,
          bodyIncludes: uniqueKey,
          result: existingComment,
        });

        if (jobStatus === 'success') {
          if (existingComment) {
            core.info(
              `Package ${change.package} status is now success, comment existing, so trying to delete it`,
            );

            await octokit.rest.issues.deleteComment({
              comment_id: existingComment.id,
              repo: queryVariables.repo,
              owner: queryVariables.owner,
            });

            return { package: change.package, result: 'success-deleted-comment' };
          }

          core.info(
            `Package ${change.package} status is now success, comment does not exists, nothing to do`,
          );

          return { package: change.package, result: 'success-nothing-to-do' };
        }

        if (jobStatus === 'failure') {
          const commentBody = createCommentBody(uniqueKey, github.context, change);

          if (existingComment) {
            core.info(
              `Package ${change.package} status is now failure, comment existing, so trying to update it`,
            );

            await octokit.rest.issues.updateComment({
              body: commentBody,
              comment_id: existingComment.id,
              issue_number: relevantPr,
              repo: queryVariables.repo,
              owner: queryVariables.owner,
            });

            return { package: change.package, result: 'success-updated-comment' };
          }

          core.info(
            `Package ${change.package} status is now failure, comment does not exists, so trying to create it`,
          );

          await octokit.rest.issues.createComment({
            body: commentBody,
            issue_number: relevantPr,
            repo: queryVariables.repo,
            owner: queryVariables.owner,
          });

          return { package: change.package, result: 'success-created-comment' };
        }
      }),
    );

    console.log('Result: ', result);
  } catch (error) {
    console.log(`Failed to run: `, error);
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
