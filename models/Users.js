const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "needs minimum length of 6 characters"],
  },
  loads: {
    title: String,
    body: String,
  },
});

//trigger a function after doc is saved to database
userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved!", doc);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
