const express = require("express");
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/game.routes")(app);
require("./routes/user.routes")(app);

app.listen(port, () => console.log(`Listening in on port: ${port}`));