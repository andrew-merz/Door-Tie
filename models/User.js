const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "ex. abc123@gmail.com"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please create a password"],
    },
    photo: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpRvftRBgfCbvzOHB0bANVih3QvZD-xZ4flbABUFGDctmaY87ajkJD5RhdvVcyZvkS7U&usqp=CAU",
    },
    location: {
      type: String,
    },
    // room: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Room",
    // },
    room: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
