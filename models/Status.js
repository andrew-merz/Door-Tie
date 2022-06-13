const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    // content: {
    //   type: String,
    //   required: true,
    // },
    // sender: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
    // recipient: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
    // room: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Room",
    // },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
