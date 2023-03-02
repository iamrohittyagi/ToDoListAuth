const Title = require("../models/todo");

module.exports.home = function (req, res) {
    Title.find({})
      .populate("user")
      .populate({
        path: "tasks",
        populate: {
          path: "user",
        },
      })
      .exec()
      .then(function (titles) {
        return res.render("home", {
          title: "Todo | Home",
          titles: titles,
        });
      })
      .catch(function (err) {
        console.error(err);
        return 
      });
  };
  
  
  
  