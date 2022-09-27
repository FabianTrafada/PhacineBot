const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName('staff')
    .setDescription('Essensial Staff Command')
    .addSubcommand((subcommand) => 
    subcommand
        .setName('ban')
        .setDescription('Bans a user')
        .addUserOption((option) =>
        option
            .setName('target')
            .setDescription('Who are you banning')
            .setRequired(true)
        )
        .addStringOption((option) =>
        option
            .setName('reason')
            .setDescription('Ban Reason')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('kick')
        .setDescription('kicks a user')
        .addUserOption((option) =>
        option
            .setName('target')
            .setDescription('Who are you kicking')
            .setRequired(true)
        )
        .addStringOption((option) =>
        option
            .setName('reason')
            .setDescription('Kick Reason')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('unban')
        .setDescription('Unbans a user')
        .addUserOption((option) =>
        option
            .setName('target')
            .setDescription('Who are you Unban | <@UsersID>')
            .setRequired(true)
        )
        .addStringOption((option) =>
        option
            .setName('reason')
            .setDescription('Unban Reason')
            .setRequired(true)
        )
    ),
    /**
     * 
     * @param {Discord.ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options } = interaction;

        if(options.getSubcommand() === 'ban') {
            if(!interaction.memberPermissions.has(Discord.PermissionFlagsBits.BanMembers)) return interaction.reply({
                content: 'You do not have ban permissions',
                ephemeral: true
            })

            const User = options.getUser('target');
            const Reason = options.getString('reason');

            let Target = interaction.guild.members.cache.get(User.id)
            Target;

            if(Target.bannable) {
                Target.send({
                    embeds: [new Discord.EmbedBuilder().setTitle('Ban notice').setFields(
                        { name: 'Guild Name', value: interaction.guild.name },
                        { name: 'Ban Reason', value: `${Reason}`},
                        { name: 'Banned By', value: `${interaction.member}`}
                    )]
                }).then(() => {
                    Target.ban({ Reason })
                }).then(() => {
                    interaction.reply({
                        content: `Succesfully banned <@${User.id}>`,
                        ephemeral: true
                    })
                })
            } else {
                interaction.reply({
                    content: `This user is __**NOT**__ bannable`,
                    ephemeral: true
                })
            }
        }
        
        if(options.getSubcommand() === 'kick') {
            if(!interaction.memberPermissions.has(Discord.PermissionFlagsBits.KickMembers)) return interaction.reply({
                content: 'You do not have kick permissions',
                ephemeral: true
            })

            const User = options.getUser('target');
            const Reason = options.getString('reason');

            let Target = interaction.guild.members.cache.get(User.id)
            Target;

            if(Target.kickable) {
                Target.send({
                    embeds: [new Discord.EmbedBuilder().setTitle('Ban notice').setFields(
                        { name: 'Guild Name', value: interaction.guild.name },
                        { name: 'Kick Reason', value: `${Reason}`},
                        { name: 'Kicked By', value: `${interaction.member}`}
                    )]
                }).then(() => {
                    Target.kick({ Reason })
                }).then(() => {
                    interaction.reply({
                        content: `Succesfully kick <@${User.id}>`,
                        ephemeral: true
                    })
                })
            } else {
                interaction.reply({
                    content: `This user is __**NOT**__ kickable`,
                    ephemeral: true
                })
            }
        }

        if(options.getSubcommand() === 'unban') {
            if(!interaction.memberPermissions.has(Discord.PermissionFlagsBits.BanMembers)) return interaction.reply({
                content: 'You do not have ban permissions',
                ephemeral: true
            })

            const User = options.getUser('target');
            const Reason = options.getString('reason');

            let Target = interaction.guild.members.cache.get(User.id)
            Target;

            interaction.guild.members.unban(User).then(() => {
                interaction.reply({
                    content: `Succesfully unbanned <@${User.id}>`,
                    ephemeral: true
                })
            })
        }
    }
}