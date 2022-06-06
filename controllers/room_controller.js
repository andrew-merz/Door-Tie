const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/room", (req, res) => {
  res.send("room route");
});

module.exports = router;
