const Game = require("../models/game.model");

module.exports = {
    addGame: (req, res) => {
        Game.create(req.body)
            .then(newGame => res.json(newGame))
            .catch(err => res.json(err));
    },

    getAllGames: (req, res) => {
        Game.find()
            .then(allGames => res.json(allGames))
            .catch(err => res.json(err));
    },

    getGame: (req, res) => {
        Game.findById(req.params.id)
            .then(game => res.json(game))
            .catch(err => res.status(400).json(err));
    },

    updateGame: (req, res) => {
        Game.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedGame => res.json(updatedGame))
            .catch(err => res.json(err));
    },

    deleteGame: (req, res) => {
        Game.deleteOne({_id: req.params.id})
            .then(deleteConfrim => res.json(deleteConfrim))
            .catch(err => res.json(err));
    }
}