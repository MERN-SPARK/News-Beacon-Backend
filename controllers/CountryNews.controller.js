const axios = require("axios");
const CountryNewsModel = require("../models/CountryNews.Model");

let CountryNewsController = async (req, res) => {
  let country = req.query.country;
  let CountryNews = await axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=e2017db226b7431a92ba137f99c16558`
    )
    .then((response) => parseCountryNews(response.data));
  res.status(200).json(CountryNews);
};

function parseCountryNews(Countrynewsdata) {
  try {
    let CountryNewsSummaries = Countrynewsdata.articles.map((item) => {
      return new CountryNewsModel(
        item.title,
        item.description,
        item.url,
        item.publishedAte,
        item.urlToImage
        // topnewsdata.copyright
      );
    });
    return Promise.resolve(CountryNewsSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = { CountryNewsController };
