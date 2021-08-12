const mongoose = require('mongoose') // Importing mongoose

const threadSchema = new mongoose.Schema({ // Creating a schema for the thread model
    userID: String,
    channelID: String,
})

const threads = mongoose.model('threads', threadSchema) // Creating a thread model
module.exports = threads // Exporting threads