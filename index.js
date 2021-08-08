// Importing Modules
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] })
const config = require('./config.json')
require('dotenv').config()

// Importing Handlers
const modmail = require('./modmail')

client.on('ready', () => { // Emits when the client is ready
    console.log(`${config.botname} is ready!`)
    client.user.setActivity(`your DMS`, { type: 'WATCHING' })

    // Enables our handlers
    modmail(client)
})

client.login(process.env.TOKEN) // Logs into the bot.