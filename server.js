"use strict"
const axios = require("axios")
const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const jwksClient = require("jwks-rsa")
app.use(cors())
require("dotenv").config()
const mongoose = require("mongoose")
const PORT = process.env.PORT
app.use(express.json())
// start call the function
const TopNewsController = require("./controllers/TopNews.Controller")
const handleWeatherAPI = require("./controllers/Weather.Controller")
const APIOneFilterController = require("./controllers/APIonefilter.Controller")
const APIOneSearchController = require("./controllers/APIonesearch.Controller")
const APItwocontroller = require("./controllers/APItwo.Controller")

// end call the function

mongoose.connect(
  `mongodb+srv://yaseen_saeed:ya9981063722@cluster0.ulxvz.mongodb.net/project301`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.get("/", (req, res) => {
  res.status(200).json({ message: "I'm working" })
})

// start call API
// app.get("/TopNews", TopNewsController)
app.get("/WeatherNews", handleWeatherAPI)
// app.get("/APIOneFilter", APIOneFilterController)
// app.get("/APIOneSearch", APIOneSearchController)

// end call API

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
