class CountryNewsModel {
  constructor(title, abstract, url, published_date, image) {
    this.title = title;
    this.abstract = abstract;
    this.url = url;
    this.published_date = published_date;
    this.image = image;
    // this.copyright = copyright;
  }
}
module.exports = CountryNewsModel;
