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
const PORT = process.env.PORT;
app.use(express.json());
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
} = require("./controllers/Signup.Controller");

const getSports = require("./controllers/APIonefilter.Controller");

// // end call the function

mongoose.connect(
  `mongodb+srv://yaseen_saeed:ya9981063722@cluster0.ulxvz.mongodb.net/project301`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "I'm working" });
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
app.delete("/delete-user/:id", deleteUser);
app.get("/APIOneFilter", getSports);
// app.get('/APIOneFilter',APIOneFilterController)
app.get("/APIOneSearch", handleAPIOneSearch);

// end call API

app.listen(PORT, () => {
  console.log(`listening to port 8070`);
});
