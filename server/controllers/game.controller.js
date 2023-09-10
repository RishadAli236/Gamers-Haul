const Game = require("../models/game.model");
const User = require("../models/user.model");

module.exports = {
    addGame: (req, res) => {
        Game.create(req.body)
            .then(newGame => {
                User.findByIdAndUpdate(newGame.user, {$push: {favorites: newGame._id}})
                    .then(res => console.log("Added new game to favorites"))
                    .catch(err => res.status(400).json(err))
                res.json(newGame)
            })
            .catch(err => {
                res.status(400).json(err)
            });
    },

    getAllGames: (req, res) => {
        Game.find().populate("user")
            .then(allGames => res.json(allGames))
            .catch(err => res.status(400).json(err));
    },

    getGame: (req, res) => {
        console.log(req.body)
        Game.findById(req.params.id).populate("user")
            .then(game => res.json(game))
            .catch(err => res.status(400).json(err));
    },

    updateGame: (req, res) => {
        console.log(req.body)
        console.log(req.params)
        Game.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .then(updatedGame => res.json(updatedGame))
            .catch(err => res.status(400).json(err));
    },

    deleteGame: (req, res) => {
        Game.deleteOne({_id: req.params.id})
            .then(deleteConfrim => res.json(deleteConfrim))
            User.findByIdAndUpdate(req.body.user, {$pull: {favorites: req.params.id}})
                .then(res => console.log("removed game from favorites"))
                .catch(err => res.status(400).json(err))
            .catch(err => res.json(err));
    }
}