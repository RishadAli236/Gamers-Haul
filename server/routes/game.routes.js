const GameController = require("../controllers/game.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/games", authenticate, GameController.addGame);
    app.get("/api/games", authenticate, GameController.getAllGames);
    app.get("/api/games/:id", authenticate, GameController.getGame);
    app.put("/api/games/:id", authenticate, GameController.updateGame);
    app.delete("/api/games/:id", authenticate, GameController.deleteGame);
}