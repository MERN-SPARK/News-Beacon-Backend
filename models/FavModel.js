const mongoose = require("mongoose");

const fav1Schema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "add the name "],
     
    },
    favdata:Array
})
const FavModels = mongoose.model("fav", fav1Schema);
module.exports = FavModels;