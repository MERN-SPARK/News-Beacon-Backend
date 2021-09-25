const axios = require("axios");
const TopNewsModel = require('../models/topnews.model')



let TopNewsController = async (req, res) => {
let topNews =  await axios.get('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=Xq7SueEX2MObTt9MBodrY1e4FIiQb42e')
.then((response)=>parseTopMovie(response.data))
res.status(200).json(topNews)
}

function parseTopMovie(topnewsdata) {
    try {
    let TopNewsSummaries = topnewsdata.results.map((item) => {
        return new TopNewsModel(
            item.title,
            item.abstract,
            item.url,
            item.published_date,
            item.multimedia[0].url
        )
    }); return Promise.resolve(TopNewsSummaries);
} catch (e) {
  return Promise.reject(e);
}
}

module.exports = {TopNewsController}