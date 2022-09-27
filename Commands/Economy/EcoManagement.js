const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Client,
    PermissionFlagsBits,
    WebhookClient,
} = require('discord.js');

const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eco-staff')
    .setDescription('Add/Remove/Set someones money')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) => 
    subcommand
        .setName('add-money')
        .setDescription('Add money to a user')
        .addUserOption((option) => 
        option
            .setName('target')
            .setDescription('Who is getting the money')
            .setRequired( true )
        )
        .addNumberOption((option) =>
        option
            .setName('amount')
            .setDescription('How much is being added')
            .setRequired( true )
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('remove-money')
        .setDescription('remove money to a user')
        .addUserOption((option) => 
        option
            .setName('target')
            .setDescription('Who is getting their money removed')
            .setRequired( true )
        )
        .addNumberOption((option) =>
        option
            .setName('amount')
            .setDescription('How much is being remove')
            .setRequired( true )
        )
    )
    .addSubcommand((subcommand) => 
    subcommand
        .setName('set-money')
        .setDescription('Set money to a user to a certain amount')
        .addUserOption((option) => 
        option
            .setName('target')
            .setDescription('Who is getting the money')
            .setRequired( true )
        )
        .addNumberOption((option) =>
        option
            .setName('amount')
            .setDescription('How much is being set')
            .setRequired( true )
        )
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { guild, member } = interaction;
        const embed = new EmbedBuilder()
        const sub = interaction.options.getSubcommand()

        switch (sub) {
            case ('add-money') : {
                let Target = interaction.options.getUser('target') || member;
                let amount = interaction.options.getNumber('amount') || 1;
                eco.balance.add(amount, Target.id, guild.id)

                embed
                    .setTitle('Coins succesfully added')
                    .setDescription(`Sucessfully added ${amount} coins to ${Target} balance! `)
                    .setColor('Random')
                    .setTimestamp()
                
                    interaction.reply({embeds: [embed]})
            }
            break;
            case ('remove-money') : {
                let Target = interaction.options.getUser('target') || member;
                let amount = interaction.options.getNumber('amount') || 1;
                eco.balance.subtract(amount, Target.id, guild.id)

                embed
                    .setTitle('Coins succesfully removed')
                    .setDescription(`Sucessfully removed ${amount} coins to ${Target} balance! `)
                    .setColor('Random')
                    .setTimestamp()
                
                    interaction.reply({embeds: [embed]})
            }
            break;
            case ('set-money') : {
                let Target = interaction.options.getUser('target') || member;
                let amount = interaction.options.getNumber('amount') || 1;
                eco.balance.set(amount, Target.id, guild.id)

                embed
                    .setTitle('Coins succesfully set')
                    .setDescription(`Sucessfully set ${amount} coins to ${Target} balance! `)
                    .setColor('Random')
                    .setTimestamp()
                
                    interaction.reply({embeds: [embed]})
            }
            break;
        }
    }
}