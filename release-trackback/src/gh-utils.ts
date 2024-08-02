import type * as github from '@actions/github';

export interface FindCommentInputs {
  owner: string;
  repo: string;
  issueNumber: number;
  commentAuthor?: string;
  bodyIncludes?: string;
  bodyRegex?: string;
  direction?: 'first' | 'last';
}

export interface Comment {
  id: number;
  body?: string;
  user: {
    login: string;
  } | null;
  created_at: string;
}

export function findCommentPredicate(inputs: FindCommentInputs, comment: Comment): boolean {
  return (
    (inputs.commentAuthor && comment.user ? comment.user.login === inputs.commentAuthor : true) &&
    (inputs.bodyIncludes && comment.body ? comment.body.includes(inputs.bodyIncludes) : true) &&
    (inputs.bodyRegex && comment.body ? comment.body.match(inputs.bodyRegex) !== null : true)
  );
}

// Adapted from: https://github.com/peter-evans/find-comment/blob/main/src/find.ts
// Thank you peter-evans
export async function findComment(
  octokit: ReturnType<typeof github.getOctokit>,
  inputs: FindCommentInputs,
): Promise<Comment | undefined> {
  const parameters = {
    owner: inputs.owner,
    repo: inputs.repo,
    issue_number: inputs.issueNumber,
  };

  if (inputs.direction === 'first') {
    for await (const { data: comments } of octokit.paginate.iterator(
      octokit.rest.issues.listComments,
      parameters,
    )) {
      // Search each page for the comment
      const comment = comments.find(comment => findCommentPredicate(inputs, comment));
      if (comment) return comment;
    }
  } else {
    // direction == 'last'
    const comments = await octokit.paginate(octokit.rest.issues.listComments, parameters);
    comments.reverse();
    const comment = comments.find(comment => findCommentPredicate(inputs, comment));
    if (comment) return comment;
  }

  return undefined;
}
