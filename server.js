const express = require("express");
const methodOverride = require("method-override");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Room = require("./models/Room");
const bcrypt = require("bcryptjs");
const db = require("./models");
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

app.get("/", (req, res) => {
  res.send("Hello WOrld");
});

//Register Route
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate username or email" });
  }
});

//Login Route
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "error", error: "Invalid Login" };
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//Retrive Status
app.get("/api/status", async (req, res) => {
  const token = req.headers["x-acess-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    return res.json({
      status: "ok",
      location: user.location,
      username: user.username,
      email: user.email,
      photo: user.photo,
      room: user.room,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

//Create New Status
app.post("/api/status", async (req, res) => {
  const token = req.headers["x-acess-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      { $set: { location: req.body.location } }
    );
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/status", async (req, res) => {
  const token = req.headers["x-acess-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { room: req.body.room } });
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
//Create a room
app.post("/api/room", async (req, res) => {
  try {
    await Room.create({
      name: req.body.name,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Room not available" });
  }
});

app.get("/api/room", async (req, res) => {
  const token = req.headers["x-acess-token"];
  try {
    const room = await Room.findById();
    return res.json({
      status: "ok",
      name: room.name,
      users: room.user,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
