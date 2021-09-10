const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { getPullRequest } = require('../utils/github')
const gitHubLinkRegex = /https:\/\/github.com\/kabum\/([\w\d-]+)\/pull\/(\d+)/gi

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete the closed PR'),
  async execute(interaction) {
    const channel = interaction.client.channels.cache.get('882701663201284120')

    channel.messages.fetch({ limit: 100 }).then((messages) => {
      //Iterate through the messages here with the variable "messages".
      messages.forEach((message) => {
        var canBeDeleted = false
        if (message.author.bot) {
          canBeDeleted = true
        }
        const prInfos = [...message.content.matchAll(gitHubLinkRegex)]
        if (!prInfos.length) {
          canBeDeleted = true
        }
        if (prInfos.length) {
          prInfos.forEach(async (pr) => {
            const data = await getPullRequest(pr[1], pr[2])
            if (data) {
              if (data.merged) {
                canBeDeleted = true
                const embedMessage = new MessageEmbed()
                  .setColor('#0099ff')
                  .setAuthor(
                    data.user.login,
                    data.user.avatar_url,
                    data.user.html_url
                  )
                  .setTitle(`${pr[1]}/${pr[2]}`)
                  .setURL(pr[0])
                  .setDescription(
                    'Meu amigo, esse PR já foi mergeado. Você já moveu o card?'
                  )
                message.author.send({ embeds: [embedMessage] })
              } else {
                canBeDeleted = false
                const embedMessage = new MessageEmbed()
                  .setColor('#0099ff')
                  .addField(
                    `CADÊ O CODE REVIEW?`,
                    `O PR [${pr[1]}/${pr[2]}](${pr[0]}) tá aguardando, viu?!`
                  )
                message.reply({ embeds: [embedMessage] })
              }
            }
          })
        }
        if (canBeDeleted) {
          message.delete()
          return
        }
      })
      return interaction.reply('Chega de novidades no sistema!')
    })
  }
}
