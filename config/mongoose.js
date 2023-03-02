const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoapp-assign");

mongoose.set("strictQuery", true);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connected db"));
db.once("open", function () {
  console.log("ToDo app db connected");
});

module.exports = db;
