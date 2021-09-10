const { SlashCommandBuilder } = require('@discordjs/builders')
const { Octokit } = require('@octokit/core')
const gitHubLinkRegex = /https:\/\/github\.com.br\/kabum/gi
const octokit = new Octokit({ auth: `${process.env['gitHubToken']}` })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete the closed PR'),
  async execute(interaction) {
    const channel = interaction.client.channels.cache.get('882701663201284120')

    const {  data : {state} } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner: 'kabum',
      repo: 'ecommerce-frontend-core',
      pull_number: 1448
    })
    channel.messages.fetch({ limit: 100 }).then((messages) => {
      //Iterate through the messages here with the variable "messages".
      messages.forEach((message) => {
        if(message.author.id !== '882702703946498119')
        message.reply(`Este PR está com status: ${state}`)
        // const user = interaction.client.users.cache.get(message.author.id);
        //   user.send(`Hello, ${login}`);
      })
      return interaction.reply('Chega de novidades no sistema!');
    })
  }
}
