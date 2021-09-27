const UserModels = require("../models/Signup.Model");
const jwt = require("jsonwebtoken");
const AppError = require("../Error/AppError")

const signToken = (id) => {
  return jwt.sign({ id }, "yaseen-secret-project", {
    expiresIn: "90d",
  });
};

const userSignup = async (req, res, next) => {
  try{
  const newUser = await UserModels.create(req.body);
  const token = signToken(newUser._id);
  res.status(200).json({
    status: "sucsess",
    token,
    data: {
      user: newUser,
    },
  });
}catch (err) {
  res.status(400).json({ status: err });
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
    res.status(400).json({ status: err });
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
    // const correct = await user.correctPassword(user.password,password)

    if (!user || !(password == user.password)) {
      let err2 = new AppError("incrrorect email or password", 401);
      return next(err2);
    }
    //

    // if every thing is ok

    const token = signToken(user._id);
    res.status(200).json({
      status: "sucess",
      token,
    });
  } catch (err) {
    res.status(400).json({ status: err });
  }
};

module.exports = { userSignup, getAllUSer,userLogin };
