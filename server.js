const express = require("express");
const methodOverride = require("method-override");
const controllers = require("./controllers");
const app = express();
const jwt = require("jsonwebtoken");
//just impporting user model unitl I move the routes
const User = require("./models/User");

require("./config/db.connection");

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

app.use("/room", controllers.room);
app.use("/auth", controllers.auth);
app.use("/user", controllers.user);

app.get("/", (req, res) => {
  res.send("hello world");
});

//youtube tutorial - Register Route
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate username or email" });
  }
});

//youtube tutorial - Login Route
//make secret more secure
app.post("/api/Login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
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

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
