// Import Modules
const { MessageEmbed, Permissions, MessageButton } = require('discord.js')
const config = require('../config.json')

const { prefix, botname } = config

module.exports = (client) => { // Export the client
    client.on('messageCreate', async (message) => { // Emits when a message is sent
        if(message.content.startsWith(`${prefix}ping`)) {
            const preEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(botname)
            .setTimestamp()
            .setDescription(`Pong!`)
            message.reply({ embeds: [ preEmbed ] }).then((editedMsg) => {
                const ping = editedMsg.createdTimestamp - message.createdTimestamp
                const embed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(botname)
                .setTimestamp()
                .setDescription(`Pong! The ping was \`${ping}ms\``)
                editedMsg.edit({ embeds: [ embed ] })
            })
        }
    })
}