const { Client, ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * 
     *  @param {Client} client
     */
    async execute(client) {
        console.log(`Client logged in as ${client.user.username}`);
        client.user.setActivity("Vscode", { type: ActivityType.Playing })
    }
}