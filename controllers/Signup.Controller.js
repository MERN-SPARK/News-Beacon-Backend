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
  if (err) {

    return res.status(400).json({
        message: (err.name === 'MongoServerError' && err.code === 11000) ? 'Email or UserName already exists !' : err.message
    });
  }}
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
const protectUser = async (req, res, next) => {
  try{
  let token;
  let error
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
   

  }
  if (!token) {
    return next(new AppError("you are not log in", 401));
  }
  
  const decoded =(jwt.verify)(token, "yaseen-secret-project")
   
  
  
    const freshuser = await UserModels.findById(decoded.id)
  if(!freshuser){
return next(new AppError('this token not exist'),401)
  }
  //check the user change paswword
  console.log(decoded.iat);
  if(freshuser.cahngepasswordafter(decoded.iat)){
    return next(new AppError('the passowrd changed'),401)
  }
// grant acces 
req.user = freshuser
  next();
} catch (err) {
  res.status(400).json({ status:err.message});
}
};
const deleteUser=async(req,res)=>{

  try{
      const get1test1 = await UserModels.findByIdAndDelete(req.params.id);
      res.status(200).json({
          status:'sucess',
          data:null
             
      })
  }catch(err){
      res.status(400).json({status:err.message})
  }
}

const adminuser = (...roles)=>{
  return(req,res,next)=>{
    // roles an array ['admin','lead-guide']
    // role now user
    if(!roles.includes(req.user.role)){
      return next(new AppError('you do not hae premission to this action',403))
    }
    next()
  }
}


module.exports = { userSignup, getAllUSer,userLogin,protectUser,deleteUser };
