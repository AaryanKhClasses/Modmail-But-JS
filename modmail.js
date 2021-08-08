// Importing Modules
const { MessageEmbed, Permissions, MessageAttachment } = require('discord.js')
const config = require('./config.json')

const { logsChannel, guildID } = config // Getting confiuration variables

module.exports = (client) => { // Exports the client
    client.on('message', async(message) => { // Emits when a message is sent
        const guild = client.guilds.cache.get(guildID) // Gets the guild
        // if(message.channel.type === 'DM') { // Checks if the channel is a DM
            if(message.content.bot) return // If the message is a bot message, do nothing
            
            let logsCategory // Gets the logs category
            if(guild.channels.cache.find(ch => ch.name.includes('Modmail'))) logsCategory = await guild.channels.cache.find(ch => ch.name.includes('Modmail')) // If the guild has a Modmail category, get it
            else logsCategory = await guild.channels.create('Modmail', { type: 'GUILD_CATEGORY', reason: 'Modmail Category' }) // If the guild doesn't have a Modmail category, create one
            
            let mailChannel // Gets the Modmail channel
            if(guild.channels.cache.find(ch => ch.name === `${message.author.username}-${message.author.discriminator}`)) mailChannel = await guild.channels.cache.find(ch => ch.name = `${message.author.username}-${message.author.discriminator}`) // If the guild has a modmail thread by the user, get it
            else mailChannel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`, { type: 'text', reason: 'Modmail Category', topic: message.author.id, parent: logsCategory }) // If the guild doesn't have a modmail thread by the user, create one
            
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)
            .setTimestamp()
            .setFooter(config.botname)
            await mailChannel.send({ embed: embed })
        // }
    })
}