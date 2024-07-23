const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User'},
    name: {type: String, require: true},
    songs: [String],
})

module.exports = mongoose.model('Playlist', playlistSchema)