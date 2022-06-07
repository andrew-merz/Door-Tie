const express = require("express");
const { User } = require("../models");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
