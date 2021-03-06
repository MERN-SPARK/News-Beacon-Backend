"use strict";
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
app.use(cors());
require("dotenv").config();
const mongoose = require("mongoose");
const session = require('express-session');
const PORT = process.env.PORT;
const MongoServer = process.env.MongoServer;
app.use(express.json());
// const RedisStore = require('connect-redis')(session)
app.use(session({
  secret:'secret-yas',
  resave:false,
  saveUninitialized:true,
  cookie:{
    secure:false
  }
}))
// start call the function

const { TopNewsController } = require("./controllers/TopNews.Controller");
const {
  PopularNewsController,
} = require("./controllers/PopularNews.Controller");
const {
  CountryNewsController,
} = require("./controllers/CountryNews.controller");

const handleWeatherAPI = require("./controllers/Weather.Controller");
const handleAPIOneSearch = require("./controllers/APIonesearch.Controller");
const handleAPITwo = require("./controllers/APItwo.Controller");
const {
  userSignup,
  getAllUSer,
  userLogin,
  protectUser,
  deleteUser,
  forgetpassord,
  resetPassword,
  sessionuser,
  signout
} = require("./controllers/Signup.Controller");

const getSports = require("./controllers/APIonefilter.Controller");
const favorateRouter = require("./routes/favorateRouter");
// // end call the function
mongoose.connect(`${MongoServer}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  req.session.view+=1
  res.status(200).json({ message:  req.session.view});
});

// start call API
app.get("/TopNews", TopNewsController);
app.get("/PopularNews", PopularNewsController);
app.get("/CountryNews", CountryNewsController);
app.get("/WeatherNews", handleWeatherAPI);
// app.get('/APIOneFilter',APIOneFilterController)
// app.get('/APIOneSearch',APIOneSearchController)

// // start signup call
app.post("/signup-user", userSignup);
app.get("/getall-user", protectUser, getAllUSer);
app.post("/login-user", userLogin);
app.post("/forget-user", forgetpassord);
app.patch("/reset-use/:token", resetPassword);
app.get("/check-user", sessionuser);
app.get("/signout-user", signout);
app.delete("/delete-user/:id", deleteUser);
app.get("/APIOneFilter", getSports);
// app.get('/APIOneFilter',APIOneFilterController)
app.get("/APIOneSearch", handleAPIOneSearch);
app.use("/favorate", favorateRouter);

// end call API

const{addfav,resdata,checkfav,endfav,getfav,delfav}=require("./controllers/FavController")
app.post("/addfav",addfav)
app.get("/endfav",endfav)
app.get("/checkfav",checkfav)
app.patch("/resdata/:id",resdata)
app.get('/getfav/:id',getfav)
app.patch('/delfav/:id',delfav)

app.listen(PORT, () => {
  console.log(`listening to port 8070`);
});
