const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName('test')
    .setDescription('test'),
    /**
     * 
     * @param {Discord.CommandInteraction} interaction
     */
    async execute (interaction) {
        interaction.reply('Testing testing 123')
    }
}