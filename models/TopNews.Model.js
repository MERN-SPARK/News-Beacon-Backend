class TopNewsModel {
  constructor(title, abstract, url, published_date, image) {
    this.title = title;
    this.abstract = abstract;
    this.url = url;
    this.published_date = published_date;
    this.image = image;
  }
}
module.exports = TopNewsModel;
