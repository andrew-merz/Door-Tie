const express = require("express");
const methodOverride = require("method-override");
const controllers = require("./controllers");
const app = express();
const navLinks = require("./navLinks");
require("./config/db.connection");

const { PORT = 4000, MONGODB_URL } = process.env;

// import middlware
const cors = require("cors");
const morgan = require("morgan");

//MiddleWare;
////////////////////////////////
app.use(methodOverride("_method"));
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

app.use("/room", controllers.room);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
