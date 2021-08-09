// Importing Stuff
const config = require('../config.json')
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)

const { prefix, guildID, botname } = config

const min = 200
const max = 500
const random = Math.floor(Math.random() * (max - min + 1)) + min

module.exports = (client) => {
    client.on("messageCreate", async(message) => {
        if (!client.application?.owner) await client.application?.fetch()
        if(message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id){
            const data = [
                {
                    name: 'ping',
                    description: 'Pings the bot!'
                }
            ]

            const commands = await client.guilds.cache.get(guildID)?.commands.set(data)
        }
    })

    client.on('interactionCreate', async(interaction) => {
        if(!interaction.command) return
        if(interaction.commandName == 'ping'){
            const preEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(botname)
            .setTimestamp()
            .setDescription(`Pong!`)
            await interaction.reply({ embeds: [ preEmbed ] })
            await wait(random)
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(botname)
            .setTimestamp()
            .setDescription(`Pong! The ping was \`${random}ms\``)
            await interaction.editReply({ embeds: [ embed ] })
        }
    })
}