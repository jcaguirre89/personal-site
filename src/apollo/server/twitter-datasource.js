const { RESTDataSource, HTTPCache } = require("apollo-datasource-rest");
class TwitterWordsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://5zoc7b1wnf.execute-api.us-east-1.amazonaws.com/default";
    this.httpCache = new HTTPCache();
  }

  async getWords(terms, language, maxWords) {
    const words = await this.post("/scrape_twitter_api", {
      terms,
      lang: language || 'es',
      max_words: maxWords || 500
    });
    return words
  }
}
module.exports = { TwitterWordsAPI };
