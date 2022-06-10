const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  // users: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  // },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
