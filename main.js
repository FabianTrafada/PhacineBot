const Discord = require('discord.js');

const {
    Guilds, GuildMembers, GuildMessages, GuildBans, GuildMessageReactions
} = Discord.GatewayIntentBits;

const {
    User, Message, GuildMember, ThreadMember, Ban, Kick
} = Discord.Partials;

const client = new Discord.Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildBans, GuildMessageReactions],
    partials: [User, Message, GuildMember, ThreadMember, Ban, Kick]
});

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');

client.config = require('./config.json');
client.commands = new Discord.Collection();

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
})
.catch(err => console.log(err));