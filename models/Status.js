const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
