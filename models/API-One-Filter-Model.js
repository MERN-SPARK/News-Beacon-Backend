"use strict";

class sportNews {
  constructor(
    title,
    abstract,
    url,
    byline,
    published_date,
    image,
    updated_date
  ) {
    this.title = title;
    this.abstract = abstract;
    this.url = url;
    this.byline = byline;
    this.published_date = published_date;
    this.image = image;
    this.updated_date = updated_date;
  }
}

module.exports = sportNews;
