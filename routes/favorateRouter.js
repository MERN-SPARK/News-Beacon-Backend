"use strict";
const { json } = require("express");
const express = require("express");
const router = express.Router();

const { seedFav, FavModel } = require("../models/favSchema");

// getting one favorate list

router.get("/:id", (req, res) => {
  let id = req.params.id;
  FavModel.find({ _id: `${id}` }).then((data) => {
    res.json(data);
  });
});

// Create one (when the user sign up we need his name to make him a new file)
router.post("/", (req, res) => {
  let item = req.body[0].name;
  let name = item;
  let new_user_favorate = new FavModel({ name: name }, []);
  new_user_favorate.save();
  res.json(new_user_favorate);
});

// update adding one; ( expected to enter the id to the item and in the body to give me the title,image,description ,url)
router.put("/:id", (req, res) => {
  let id = req.params.id;
  let title = req.body[0].title;
  let image = req.body[0].image;
  let description = req.body[0].description;
  let url = req.body[0].url;

  FavModel.find({ _id: `${id}` }).then((data) => {
    let favorate = data[0].favorate;
    favorate.push({
      title: title,
      image: image,
      description: description,
      url: url,
    });

    // data[0].name = name;
    data[0].favorate = favorate;
    // res.status(200).json(updated_data);
    console.log(data[0]);
    data[0].save();
  });
  res.send("its working");
});

// delete one; I should have the id of the user and the id of the item
router.delete("/:id", (req, res) => {
  let userId = req.params.id;
  let newsId = req.body[0]._id;
  FavModel.find({ _id: `${userId}` }).then((data) => {
    let favorate = data[0].favorate;
    favorate = favorate.filter(
      (object) => String(object._id) !== String(newsId)
    );
    data[0].favorate = favorate;
    data[0].save();
    console.log(favorate);
  });
  res.send(newsId);
});

// filter function

module.exports = router;
