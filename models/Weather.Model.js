"use strict";

class WeatherModel {
  constructor(description, place, temp, min, max,icon) {
    this.description = description;
    this.place = place;
    this.temp = temp;
    this.min = min;
    this.max = max;
    this.icon =icon;
  }
}

module.exports = WeatherModel;
