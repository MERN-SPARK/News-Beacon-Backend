const axios = require("axios");
const TopNewsModel = require("../models/TopNews.Model");

let TopNewsController = async (req, res) => {
  try{
  let topNews = await axios
    .get(
      "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=Xq7SueEX2MObTt9MBodrY1e4FIiQb42e"
    )
    .then((response) => parseTopMovie(response.data.results));
  res.status(200).json(topNews);
    }catch (err) {
      res.status(400).json({ status: err });
    }
};

function parseTopMovie(topnewsdata) {
  try {
    let img
    let TopNewsSummaries = topnewsdata.map((item,index) => {
      if(item.multimedia===null || item.multimedia===0){
        img= "http://www.sevengatellc.com/UploadFiles/Article_Images/201822712916.jpg"
      }else{
        img=item.multimedia[0].url
      }
      return new TopNewsModel(
        item.title,
        item.abstract,
        item.url,
        item.published_date,
        img,
        topnewsdata.copyright
      );
    });
    return Promise.resolve(TopNewsSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = { TopNewsController };
