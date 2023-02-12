import { URL } from 'node:url';
import { Lexer, marked } from 'marked';
import { parse as parseSemVer, SemVer } from 'semver';
import * as github from '@actions/github';

export type RenovatePackageChange = {
  package: string;
  repository: {
    owner: string;
    repo: string;
  };
  from: SemVer | null;
  to: SemVer | null;
};

export function createCommentBody(
  uniqueKey: string,
  context: typeof github.context,
  change: RenovatePackageChange,
) {
  let content = `### 🛤️ The Guild Trackback`;
  content += `\n❌ The NPM release **\`${change.package}@${change.to}\`** created by this Pull Request failed the continuous integration (workflow: **\`${context.workflow}\`**, job: **\`${context.job}\`**) for repository **[\`${context.repo.owner}/${context.repo.repo}\`](https://github.com/${context.repo.owner}/${context.repo.repo})**.`;
  content += `\n\nYou can find additional details on the following links:`;
  content +=
    '\n' +
    [
      `- ${context.payload.pull_request?.html_url}`,
      `- [GitHub Actions workflow logs](https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}/)`,
      `- [\`${change.package}@${change.to}\` @ npm](https://www.npmjs.com/package/${change.package}/v/${change.to})`,
      `- [\`${change.package}@${change.to}\` @ unpkg](https://unpkg.com/browse/${change.package}@${change.to}/)`,
    ].join('\n');

  return `${uniqueKey}\n${content}`;
}

function matchWithStar(str: string, rule: string) {
  // eslint-disable-next-line no-useless-escape
  const escapeRegex = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');

  return new RegExp('^' + rule.split('*').map(escapeRegex).join('.*') + '$').test(str);
}

export function starMatch(pattern: string, str: string): boolean {
  return pattern.includes('*') ? matchWithStar(str, pattern) : pattern === str;
}

export function filterRelevantPackages(
  relevantPatterns: string[],
  changed: RenovatePackageChange[],
): RenovatePackageChange[] {
  return changed.filter(change => relevantPatterns.some(p => starMatch(p, change.package)));
}

export function extractChangedPackages(prBody: string): RenovatePackageChange[] {
  const lexer = new Lexer();
  const tokens = lexer.lex(prBody);
  const tables = tokens.filter(t => t.type === 'table');

  if (tables.length !== 1) {
    throw new Error(`Expected exactly one table in PR body, but found ${tables.length}.`);
  }

  const modificationsTable = tables[0] as marked.Tokens.Table;
  const tableRows = modificationsTable.rows || [];

  return tableRows.map(tableCells => {
    const repository = new URL(
      (tableCells[0].tokens[0] as marked.Tokens.Link).href,
    ).pathname.substring(1);

    return {
      package: (tableCells[0].tokens[0] as marked.Tokens.Link).text,
      repository: {
        owner: repository.split('/')[0],
        repo: repository.split('/')[1],
      },
      from: parseSemVer(
        ((tableCells[1].tokens[0] as marked.Tokens.Link).tokens[0] as marked.Tokens.Codespan).text,
      ),
      to: parseSemVer(
        ((tableCells[1].tokens[0] as marked.Tokens.Link).tokens[2] as marked.Tokens.Codespan).text,
      ),
    };
  });
}
