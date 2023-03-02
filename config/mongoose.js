const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rohittyagi022:ULnNlrAWZ1m6nVRd@cluster0.sjphfez.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.set("strictQuery", true);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connected db"));
db.once("open", function () {
  console.log("ToDo app db connected");
});

module.exports = db;
