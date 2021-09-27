"use strict";

let axios = require("axios");
let Search  = require("../models/ApiSearch.Model");

const handleAPIOneSearch = (req, res) => {
  let q = req.query.q;
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?apiKey=4bf0bd62a6364b3a812a318b7ba23326&q=${q}`
    )
    .then((data) => {
      let articles = data.data.articles;
      res
        .status(200)
        .send(
          articles.map(
            (article) =>
              new Search(
                article.title,
                article.description,
                article.url,
                article.urlToImage
              )
          )
        );
    });
};

module.exports = handleAPIOneSearch;
