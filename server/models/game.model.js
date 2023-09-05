const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema(
    {
        title: String,
        genre: String,
        platform: String,
        description: String
    }, 
    {timestamps: true}
);

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;