const { Octokit } = require('@octokit/core')
const { gitHubToken } = require('../config.json')
const octokit = new Octokit({ auth: `${gitHubToken}` })

async function getPullRequest(repo, pullNumber) {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}',
    {
      owner: 'kabum',
      repo: repo,
      pull_number: +pullNumber
    }
  )
  return data
}

module.exports = {
  getPullRequest
}
