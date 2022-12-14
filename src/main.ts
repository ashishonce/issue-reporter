import * as core from '@actions/core';
import * as github from '@actions/github';

import * as summarizeIssues from './summarize-issues';

async function main(): Promise<void> {
    try {
        await summarizeIssues.run({
            title: core.getInput('title'),
            configPath: core.getInput('configPath'),
            outputPath: core.getInput('outputPath'),
            tableConfigPath: core.getInput('tableConfigPath'),
            octokit: new github.GitHub(core.getInput('token')),
            octokitRemoteRepo: new github.GitHub(core.getInput('remoteRepoToken')),
            repoContext: { ...github.context.repo }
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

main().catch(err => console.error(err));