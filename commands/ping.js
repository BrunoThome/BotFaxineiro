const { SlashCommandBuilder } = require('@discordjs/builders')

const gitHubLinkRegex = /https:\/\/github\.com/gi

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const channel = interaction.client.channels.cache.get('882701663201284120')
    channel.messages.fetch({ limit: 100 }).then((messages) => {
      console.log(`Received ${messages.size} messages`)
      //Iterate through the messages here with the variable "messages".
      messages.forEach((message) => {
        if (gitHubLinkRegex.test(message.content)) {
          console.log(message.content)
        } else {
          message.delete()
        }
      })
    })
    await interaction.reply('Pong!')
  }
}
