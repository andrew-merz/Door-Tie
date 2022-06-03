require("dotenv").config();

const { PORT = 4000, MONGODB_URL } = process.env;

const express = require("express");

const app = express();

const mongoose = require("mongoose");

mongoose.connect(MONGODB_URL);

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
