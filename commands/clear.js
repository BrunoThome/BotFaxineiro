const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear the closed PR'),
  async execute(interaction) {
    console.log(interaction.channel)
    await interaction.reply('Pong!')
  }
}
