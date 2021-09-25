"use strict"

const axios = require("axios")
const WeatherModel = require("../models/Weather.Model")

let handleWeatherAPI = async (req, res) => {
  // let latitude = req.query.latitude
  // let longitude = req.query.longitude
  let city = req.query.city
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&city=${city}`

  let response = await axios.get(url)
  if (response !== null) {
    let responseData = response.data.map((item) => {
      return new WeatherModel(item.data.datetime, item.data.weather.description)
    })
    res.status(200).json(responseData)
  }
}

module.exports = handleWeatherAPI
