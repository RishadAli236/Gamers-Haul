const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:5173"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
require("./config/mongoose.config");
require("./routes/game.routes")(app);
require("./routes/user.routes")(app);

app.listen(port, () => console.log(`Listening in on port: ${port}`));