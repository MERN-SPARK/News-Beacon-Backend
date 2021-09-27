const mongoose = require("mongoose");
const validator = require("validator");

const user1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "add the name "],
    unique: false,
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
    select: false,
    required: [true, "provide confirm password"],
    validate: {
      validator: function (ele) {
        // this only works in dave
        return ele === this.password;
      },
      message: "the password is different",
    },
  },
  changepassword:{
    type:Date,
    default:Date.now(),
  },
  role:{
    type:String,
    enum:['user','guide','load-guide','admin'],
    default:'user'
  }
});

user1Schema.methods.cahngepasswordafter = function(JWTTimestamp){
  if(this.changepassword){
const changestart = parseInt(this.changepassword.getTime()/1000,10)

return JWTTimestamp < changestart

}
return false
}
const UserModels = mongoose.model("users", user1Schema);
module.exports = UserModels;
