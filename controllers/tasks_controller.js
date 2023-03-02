const Task = require("../models/task");
const Title = require("../models/todo");

module.exports.create = async function (req, res) {
  try {
    const title = await Title.findById(req.body.title);
    if (title) {
      const task = await Task.create({
        content: req.body.content,
        category: req.body.category,
        date: req.body.date,
        title: req.body.title,
        user: req.user._id,
      });
      title.tasks.push(task);
      await title.save();
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
  }
};


module.exports.destroy = async function (req, res) {
    try {
      const task = await Task.findById(req.params.id);
      if (task.user == req.user.id) {
        let titleId = task.title;
        await task.constructor.findByIdAndRemove(task._id);
        let title = await Title.findByIdAndUpdate(titleId, {
          $pull: { tasks: req.params.id },
        });
        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      return res.redirect("back");
    }
  };