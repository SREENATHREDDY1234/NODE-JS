const mongoose = require('mongoose');

const artist_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[100,"name should no greater than 100 characters"],
        trim:true,
    },
    bio: { type: String, default: "No bio available." },
    genre: { type: String, default: "Unknown" },
    latestSongs: { type: [String], default: [] },
    latestinfo: { type: String, default: "No latest info available." },
    upcomingShowInfo: { type: String, default: "No upcoming shows." },
    socialLinks: { type: [String], default: [] },
},{timestamps:true})

module.exports = mongoose.model('Artist',artist_schema);