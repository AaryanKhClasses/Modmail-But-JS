// Importing Modules
const { MessageEmbed, Permissions, MessageAttachment } = require('discord.js')
const config = require('../config.json')

const { guildID, prefix, botname } = config // Getting confiuration variables

module.exports = (client) => { // Exports the client
    client.on('messageCreate', async (message) => { // Emits when a message is sent
        const guild = client.guilds.cache.get(guildID) // Gets the guild
        if(message.channel.type === 'DM') { // Checks if the channel is a DM
            if(message.author.bot) return // If the message is a bot message, do nothing

            let str // String to hold the message
            const target = await guild.members.fetch(message.author.id) // Gets the member
            const rolestr = (target.roles ? target.roles.cache.map(r => `${r}`).join(` | `) : '').replace('@everyone', '') // Gets the role string
            if(rolestr.length > 340) { // If the role string is too long
                str = `${rolestr.slice(0, 340)} \`+ ${target.roles.highest.position - 7}\`` // Gets the role string
            } else { // If the role string is not too long
                str = rolestr // Sets the string to the role string
            }

            let logsCategory // Gets the logs category
            if(guild.channels.cache.find(ch => ch.name.includes('Modmail'))) logsCategory = await guild.channels.cache.find(ch => ch.name.includes('Modmail')) // If the guild has a Modmail category, get it
            else logsCategory = await guild.channels.create('Modmail', { type: 'GUILD_CATEGORY', reason: 'Modmail Category' }) // If the guild doesn't have a Modmail category, create one

            let logsChannel
            if(guild.channels.cache.find(ch => ch.name.includes('modmail-logs'))) logsChannel = await guild.channels.cache.find(ch => ch.name.includes('modmail-logs')) // If the guild has a Modmail logs channel, get it
            else logsChannel = await guild.channels.create('modmail-logs', { type: 'GUILD_TEXT', reason: 'Modmail Logs Channel', parent: logsCategory }) // If the guild doesn't have a Modmail logs channel, create one

            let mailChannel // Gets the Modmail channel
            if(logsChannel.threads.cache.find(ch => ch.name === `${message.author.username}-${message.author.discriminator}`)) mailChannel = await logsChannel.threads.cache.find(ch => ch.name === `${message.author.username}-${message.author.discriminator}`) // If the guild has a modmail thread by the user, get it
            else { // If the guild doesn't have a modmail thread by the user
                mailChannel = await logsChannel.threads.create({ name: `${message.author.username}-${message.author.discriminator}` })
                const introEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .setTitle('New Modmail Thread')
                .setTimestamp()
                .setFooter(`${botname} | MessageID: ${message.id}`)
                .addField('User', message.author.tag, true)
                .addField('UserID', message.author.id, true)
                .addField('Nickname', target.nickname || message.author.username, true)
                .addField('Previous Logs', `hasPreviousLogsNO`, true)
                .addField('Roles', str)
                await mailChannel.send({ embeds: [ introEmbed ] }) // Send the intro embed

                const logEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .setTitle('New Modmail Thread')
                .setTimestamp()
                .setFooter(`${botname} | Thread ID: ${mailChannel.id}`)
                .addField('User', message.author.tag, true)
                .addField('UserID', message.author.id, true)
                logsChannel.send({ embeds: [ logEmbed ] }) // Send the log embed
            }

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)
            .setTimestamp()
            .setFooter(botname)
            await mailChannel.send({ embeds: [ embed ] })
        }
    })
}