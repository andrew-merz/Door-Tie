const express = require("express");
const router = express.Router();
const db = require("../models");

//index route
router.get("/", async (req, res) => {
  try {
    res.json(await Room.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//Create Route
router.get("/room", async (req, res) => {
  try {
    // get all people
    res.json(await Room.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// Room UPDATE ROUTE
router.put("/room/:id", async (req, res) => {
  try {
    // update people by ID
    res.json(await Room.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});
//Room delete
router.delete("/room/:id", async (req, res) => {
  try {
    // delete people by ID
    res.json(await Room.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});
module.exports = router;
