const axios = require("axios");
const PopularNewsModel = require("../models/PopularNews.Model");

let PopularNewsController = async (req, res) => {
  let popularNews = await axios
    .get(
      "https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=Xq7SueEX2MObTt9MBodrY1e4FIiQb42e"
    )
    .then((response) => parsePopularMovie(response.data));

  res.status(200).json(popularNews);
};

function parsePopularMovie(popularnewsdata) {
  try {
    let PopularNewsSummaries = popularnewsdata.results.map((item) => {
      if (item.media[0] != null) {
        let mediaimage = Object.values(item.media[0])[5][2].url;
        return new PopularNewsModel(
          item.title,
          item.abstract,
          item.url,
          item.published_date,
          mediaimage
        );
      }
    });
    return Promise.resolve(PopularNewsSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = { PopularNewsController };
