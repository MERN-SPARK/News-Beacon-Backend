"use strict";
const mongoose = require("mongoose");

const favListSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  url: String,
});

module.exports = favListSchema;
