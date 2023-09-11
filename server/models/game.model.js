const mongoose = require("mongoose");
// Install and import uniqueValidator for unique validations
const uniqueValidator = require("mongoose-unique-validator");

const GameSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
            minLength: [2, "title should be at least 2 characters"],
            unique: true,
            uniqueCaseInsensitive: true
        },
        genre: {
            type: String,
            required: [true, "genre is required"],
            minLength: [2, "genre should be at least 2 characters"]
        },
        platform: {
            type: String,
            required: [true, "platform is required"],
            minLength: [2, "platform should be at least 2 characters"]
        },
        description: {
            type: String,
            required: [true, "description is required"],
            minLength: [3, "description should be at least 3 characters"]

        },
        image: {
            type: String,
            required: [true, "url is required"]
        },
        user: {type: mongoose.ObjectId, ref: "User"}
    }, 
    {timestamps: true}
);

//Use plugin to generate custom error message when duplicate title is detected
GameSchema.plugin(uniqueValidator, {message: "A game with the title {VALUE} has already been added"})

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;