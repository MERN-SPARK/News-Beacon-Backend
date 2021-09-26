"use strict";

class WeatherModel {
  constructor(description, place, temp, min, max) {
    this.description = description;
    this.place = place;
    this.temp = temp;
    this.min = min;
    this.max = max;
  }
}

module.exports = WeatherModel;
