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
const {TopNewsController} = require('./controller/topnews.controller')
const {PopularNewsController} = require('./controller/popularnew.controller')
// const WeatherNewsController = require('./controller/weathernews.controller')
// const APIOneFilterController = require('./controller/APIonefilter.controller.js')
// const APIOneSearchController = require('./controller/APIonesearch.controller')

// const APItwocontroller = require('./controller/APItwo.controller')


// end call the function

mongoose.connect(
  `mongodb+srv://yaseen_saeed:ya9981063722@cluster0.ulxvz.mongodb.net/project301`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.get("/", (req, res) => {
  res.status(200).json({ message: "I'm working" })
})

// start call API
app.get('/TopNews',TopNewsController)
app.get('/PopularNews',PopularNewsController)
// app.get('/WeatherNews',WeatherNewsController)
// app.get('/APIOneFilter',APIOneFilterController)
// app.get('/APIOneSearch',APIOneSearchController)




// end call API

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
