"use strict";

const mongoose = require("mongoose");
const favListSchema = require("../models/favorateListSchema");
const validator = require("validator");
const favSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true

  },
  favorate: {
    type:Array,
    unique:true
  }
});

const FavModel = mongoose.model("favorate", favSchema);

let seedFav = () => {
  let booksList = [
    {
      title: "Mastery",
      description: "Lorem ipsum......",
    },
    {
      title: "Art of Seduction",
      description: "Lorem ipsum......",
    },
    {
      title: "Humans",
      description: "Lorem ipsum......",
    },
  ];

  let newAuthor = new FavModel({
    name: "Robert Greene",
    favorate: booksList,
  });
  newAuthor.save();
};

module.exports = {
  
  FavModel,
};
