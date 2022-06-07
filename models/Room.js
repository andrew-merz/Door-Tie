const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
