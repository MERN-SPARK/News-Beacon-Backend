const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
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
  changepassword: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: ["user", "guide", "load-guide", "admin"],
    default: "user",
  },
  passwordresetToken: String,
  passwordreserExpire: Date,
  isAuthenticated:{
    type:Boolean,
    default:true
  }
});

user1Schema.pre("save", async function (next) {
    // only run this function if passwird was actually modified
    if (!this.isModified("password")) return next();
    // hash the password
    this.password = await bcrypt.hash(this.password, 12);
    // delete passwordConfirm
    this.passwordConfirm = undefined;
    next();
  });
  


  user1Schema.methods.correctPassword =   async function(JWTTimestamp,userpassword){
   let result =  await bcrypt.hash(userpassword, 12);
   console.log(result);
   console.log(JWTTimestamp);
   return(await bcrypt.compare(userpassword, JWTTimestamp));
  ;}



user1Schema.methods.cahngepasswordafter = function (JWTTimestamp) {
  if (this.changepassword) {
    const changestart = parseInt(this.changepassword.getTime() / 1000, 10);

    return JWTTimestamp < changestart;
  }
  return false;
};


user1Schema.methods.createmewpassword = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordresetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordreserExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
user1Schema.pre('save',function(next){
  if(!this.isModified('password') || this.isNew) return next();
this.changepassword=Date.now()-1000;
next()
})
const UserModels = mongoose.model("users", user1Schema);
module.exports = UserModels;
