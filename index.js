// Importing Modules
const { Client, Intents } = require('discord.js')
const mongoose = require('mongoose')
const client = new Client({ partials: ["CHANNEL", "USER", "REACTION", "MESSAGE"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] })
const config = require('./config.json')
require('dotenv').config()

// Importing Handlers
const modmail = require('./utils/dms')
const MISCCommands = require('./commands/MISCCommands')
const MISCSlashCommands = require('./commands/MISCSlashCommands')

client.on('ready', () => { // Emits when the client is ready
    console.log(`${config.botname} is ready!`)
    client.user.setActivity(`your DMS`, { type: 'WATCHING' })

    mongoose.connect(process.env.MONGOURI, {
		useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    // Enables our handlers
    modmail(client)
    MISCCommands(client)
    MISCSlashCommands(client)
})

client.login(process.env.TOKEN) // Logs into the bot.