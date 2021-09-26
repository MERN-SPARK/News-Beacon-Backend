"use strict";
const { default: axios } = require("axios");
const { model } = require("mongoose");
const sportNews = require("../Models/API-One-Filter-Model");

let getSports = async (req, res) => {
  let section = req.query.section;
  let urlSports = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key= Xq7SueEX2MObTt9MBodrY1e4FIiQb42e`;

  let sportsNewsData = await axios.get(urlSports);
  // res.send(sportsNewsData.data);
  // console.log(sportsNewsData.data);
  let finalSportsData = sportsNewsData.data.results.map((article) => {
    return new sportNews(
      article.title,
      article.abstract,
      article.url,
      article.byline,
      article.published_date,
      article.multimedia[0].url,
      article.updated_date

    );
  });
  res.send(finalSportsData);
  console.log(finalSportsData);
};

module.exports = getSports;
