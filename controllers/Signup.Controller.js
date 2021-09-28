const UserModels = require("../models/Signup.Model");
const jwt = require("jsonwebtoken");
const AppError = require("../Error/AppError");
const sendEmail = require("./email");
const sendEmail2 =require("./email2")
const crypto = require("crypto");
let check
let data
const signToken = (id) => {
  return jwt.sign({ id }, "yaseen-secret-project", {
    expiresIn: "90d",
  });
};

const userSignup = async (req, res, next) => {
  try {
    const newUser = await UserModels.create(req.body);
    const token = signToken(newUser._id);
    req.session.user=newUser._id
    check=newUser
    res.status(200).json({
      status: "sucsess",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        message:
          err.name === "MongoServerError" && err.code === 11000
            ? "Email or UserName already exists !"
            : err.message,
      });
    }
  }
};

const getAllUSer = async (req, res, next) => {
  try {
    const getuser = await UserModels.find();
    res.status(200).json({
      status: "sucess",
      data: {
        getuser,
      },
    });
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // check if email and password exist
    if (!email || !password) {
      let err = new AppError("please provide email and password", 400);
      return next(err);
    }

    // check if user exist && passord are coorect
    
    const user = await UserModels.findOne({ email }).select("+password");
    check=user
    const correct = await user.correctPassword(user.password, String(password));


    if (!user || !correct) {
      let err2 = new AppError("incrrorect email or password", 401);
      return next(err2);
    }
    //

    // if every thing is ok

    const token = signToken(user._id);
    
    res.status(200).json({
      status: "sucess",
      user,
    });
  } catch (err) {
    res.status(400).json({ status: err });
  }
};
const protectUser = async (req, res, next) => {
  try {
    let token;
    let error;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new AppError("you are not log in", 401));
    }

    const decoded = jwt.verify(token, "yaseen-secret-project");

    const freshuser = await UserModels.findById(decoded.id);
    if (!freshuser) {
      return next(new AppError("this token not exist"), 401);
    }
    //check the user change paswword
    if (freshuser.cahngepasswordafter(decoded.iat)) {
      return next(new AppError("the passowrd changed"), 401);
    }
    // grant acces
    req.user = freshuser;
    next();
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const get1test1 = await UserModels.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
};

const adminuser = (...roles) => {
  return (req, res, next) => {
    // roles an array ['admin','lead-guide']
    // role now user
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you do not hae premission to this action", 403)
      );
    }
    next();
  };
};
const forgetpassord = async (req, res, next) => {
  //get user based on post email
  const user = await UserModels.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with email adress", 404));
  }

  // generate the random reset token
  const resetToken = user.createmewpassword();
  console.log(resetToken)
  await user.save({validateforeSave:true});

  // send it to user email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = ` Forget your password? Submit a PATCH reqeuest with your new password and passwordConfirm to:${resetURL}.\nIf you didn't forget your password, pleaseignore this email`;
  // try {
  //   await sendEmail2({
  //     email:user.email,
  //     subject:"your password reset Token is valid for 10 minutes",
  //     message
      
  //   });
  //   res.status(200).json({
  //     status: "success",
  //     message: "token sent to email",
  //   });
  // } catch (err) {
  //   user.passwordresetToken = undefined;
  //   user.passwordreserExpire = undefined;
  //   await user.save({validateforeSave:true});
  //   return next(
  //     new AppError("there was an error sending the email. Try again later!"),
  //     500
  //   );
  // }
};
const resetPassword = async(req, res, next) => {
  // get yser based
  try{
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await UserModels.findOne({
    passwordresetToken: hashedToken,
    passwordreserExpire: { $gt: Date.now() },
  });

  //check user and token

if(!user){
  return next(new AppError('Token is anvlid',400))
}
user.password=req.body.password
user.passwordConfirm=req.body.passwordConfirm
user.passwordresetToken=undefined
user.passwordreserExpire=undefined
await user.save()
  //changepassword
  const token = signToken(user._id);
  res.status(200).json({
    status: "sucess",
    token,
  })}catch (err) {
    res.status(400).json({ status: err.message });
  }
  // login
};

const sessionuser=(req,res)=>{
  if(check){
    return res.json({
      auth:true,
      message:'you are a signned',
      data:check
    })
  }
  return res.json({
    auth:false,
    message:'you are a not login'
  })
}
const signout=(req,res)=>{
check=false
  res.json({
    auth:false
  })
}
module.exports = {
  resetPassword,
  forgetpassord,
  userSignup,
  getAllUSer,
  userLogin,
  protectUser,
  deleteUser,
  sessionuser,
  signout
};
