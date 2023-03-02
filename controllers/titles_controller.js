const Task = require("../models/task");
const Title = require("../models/todo");

module.exports.create = async function (req, res) {
  try {
    const title = await Title.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("error in creating a Title");
    return;
  }
};


module.exports.destroy = async function (req, res) {
    try {
      let title = await Title.findById(req.params.id);
      // .id means coverting the object id into string
      if (title.user == req.user.id) {
        await title.constructor.findByIdAndRemove(title._id);
        await Task.deleteMany({ title: req.params.id });
        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    } catch (err) {
      console.log("Error", err);
      return res.redirect("back");
    }
  };
