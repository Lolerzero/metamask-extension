import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';

const MAX_DAYS_OF_INACTIVITY = 60;

main().catch((error: Error): void => {
  console.error(error);
  process.exit(1);
});

async function main(): Promise<void> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    core.setFailed('GITHUB_TOKEN not found');
    process.exit(1);
  }

  const octokit = getOctokit(token)

  try {
    const stalenessThreshold = Number(new Date()) - MAX_DAYS_OF_INACTIVITY * 24 * 60 * 60 * 1000;
    const formattedThreshold = convertDateFormat(stalenessThreshold);

    const searchQuery = `is:open is:pr repo:${context.repo.owner}/${context.repo.repo} updated:<${formattedThreshold}`;

    const response = await octokit.rest.search.issuesAndPullRequests({ q: searchQuery });

    const prNumbers = response.data.items.map((item) => item.number);

    for (let i = 0 ; i < prNumbers.length; i += 1) {
      console.log(prNumbers[i]);
      // await commentAndClosePR(octokit, prNumbers[i]);
    }
  } catch (error) {
    console.error(`Error processing PRs: ${error}`);
  }
}

async function commentAndClosePR(octokit: InstanceType<typeof GitHub>, prNumber: number): Promise<void> {
  const commentBody = `Thank you for your contribution to MetaMask Extension. In order to maintain a clean and relevant PR queue,
we close all PRs after ${MAX_DAYS_OF_INACTIVITY} days of inactivity.
Please reopen this PR once you have new changes to add.`;

  // Comment on the PR
  await octokit.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
    body: commentBody,
  });

  // Close the PR
  await octokit.rest.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: prNumber,
    state: 'closed',
  });
}

function convertDateFormat(dateNumber: number): string {
  const date = new Date(dateNumber);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}