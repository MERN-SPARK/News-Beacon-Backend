const mongoose = require("mongoose");
const validator = require("validator");

const user1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "add the name "],
  },
  email: {
    type: String,
    required: [true, "add the email "],
    unique: true,
    lowercase: true, // JOAn=> joan
    validate: [validator.isEmail, "please valid email"],
  },
  //   photo: String,
  password: {
    type: String,
    required: [true, "provide password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "provide confirm password"],
    validate: {
      validator: function (ele) {
        // this only works in dave
        return ele === this.password;
      },
      message: "the password is different",
    },
  },
  // changepassword:Date
});
const UserModels = mongoose.model("users", user1Schema);
module.exports = UserModels;
