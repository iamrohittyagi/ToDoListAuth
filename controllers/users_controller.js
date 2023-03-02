const User = require("../models/user");


module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Team Career Camp | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Team Career Camp | Sign Up",
  });
};

module.exports.create = async (req, res) => {
  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.redirect("/users/sign-in");
    }

    // Create a new user object with the form data
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user to the database
    await user.save();

    // Redirect to the login page
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.log("Error in finding user in signing up!", err);
  }
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  return res.redirect("/");
};
