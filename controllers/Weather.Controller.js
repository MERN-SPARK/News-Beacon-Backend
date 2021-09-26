"use strict";

const axios = require("axios");
const WeatherModel = require("../models/Weather.Model");

const getWeather = (data) => {
  let weather = data.data.map((element) => {
    return new WeatherModel(
      element.weather.description,
      data.city_name,
      element.temp,
      element.min_temp,
      element.max_temp
    );
  });
  return weather;
};

let handleWeatherAPI = async (req, res) => {
  let city = req.query.city;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=bfd9692c3bd34ed3adfa0d41306a187d&days=3&city=${city}`;

  let response = await axios.get(url).then((res) => {
    return getWeather(res.data);
  });
  res.status(200).json(response);
};

module.exports = handleWeatherAPI;
