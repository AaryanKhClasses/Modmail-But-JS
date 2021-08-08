// Importing Modules
const { MessageEmbed, Permissions, MessageAttachment } = require('discord.js')
const config = require('./config.json')

const { logsChannel, guildID, prefix, botname } = config // Getting confiuration variables

module.exports = (client) => { // Exports the client
    client.on('message', async(message) => { // Emits when a message is sent
        const guild = client.guilds.cache.get(guildID) // Gets the guild
        // if(message.channel.type === 'DM') { // Checks if the channel is a DM
            if(message.author.bot) return // If the message is a bot message, do nothing

            let str // String to hold the message
            const target = guild.members.cache.get(message.author.id) // Gets the member
            const rolestr = ((target.roles ? target.roles.cache.map(r => `${r}`).join(` | `) : '').replace('@everyone', '')) // Gets the role string
            if(rolestr.length > 340) { // If the role string is too long
                str = `${rolestr.slice(0, 340)} \`+ ${target.roles.highest.position - 7}\`` // Gets the role string
            } else { // If the role string is not too long
                str = rolestr // Sets the string to the role string
            }
            
            let logsCategory // Gets the logs category
            if(guild.channels.cache.find(ch => ch.name.includes('Modmail'))) logsCategory = await guild.channels.cache.find(ch => ch.name.includes('Modmail')) // If the guild has a Modmail category, get it
            else logsCategory = await guild.channels.create('Modmail', { type: 'GUILD_CATEGORY', reason: 'Modmail Category' }) // If the guild doesn't have a Modmail category, create one
            
            let mailChannel // Gets the Modmail channel
            if(guild.channels.cache.find(ch => ch.name === `${message.author.username}-${message.author.discriminator}`)) mailChannel = await guild.channels.cache.find(ch => ch.name === `${message.author.username}-${message.author.discriminator}`) // If the guild has a modmail thread by the user, get it
            else { // If the guild doesn't have a modmail thread by the user
                mailChannel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`, { type: 'text', reason: 'Modmail Channel', topic: `**User ID:** ${message.author.id}`, parent: logsCategory }) // Create a modmail thread by the user
                console.log(mailChannel.id)
                const introEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .setTitle('New Modmail Thread')
                .setTimestamp()
                .setFooter(`${config.botname} | MessageID: ${message.id}`)
                .addField('User', message.author.tag, true)
                .addField('UserID', message.author.id, true)
                .addField('Roles', rolestr)
                await mailChannel.send({ embeds: [ introEmbed ] }) // Send the intro embed    
            }

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)
            .setTimestamp()
            .setFooter(config.botname)
            await mailChannel.send({ embeds: [ embed ] })
        // }
    })
}