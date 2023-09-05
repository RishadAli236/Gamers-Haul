const GameController = require("../controllers/game.controller");

module.exports = (app) => {
    app.post("/api/games", GameController.addGame);
    app.get("/api/games", GameController.getAllGames);
    app.get("/api/games/:id", GameController.getGame);
    app.put("/api/games/:id", GameController.updateGame);
    app.delete("/api/games/:id", GameController.deleteGame);
}