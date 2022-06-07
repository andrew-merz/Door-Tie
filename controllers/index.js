require("../config/db.connection");

module.exports = {
  auth: require("./auth_controller"),
  room: require("./room_controller"),
  user: require("./user_controller"),
};
