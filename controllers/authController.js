const User = require("../models/Users");

//handle errors
function handleErrors(err) {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //checking for duplicates
  if (err.code === 11000) {
    errors.email = "email already existed";
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
    res.redirect("login");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //checking for authentication
  try {
    if (email === "email" || password === "password") {
      res.render("load");
    }
  } catch (err) {
    res.status(400).json("incorrect email or password!");
  }
};
module.exports.load_get = async (req, res) => {
  res.render("load");
};
