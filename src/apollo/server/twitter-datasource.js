const { RESTDataSource, HTTPCache } = require("apollo-datasource-rest");
class TwitterWordsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://5zoc7b1wnf.execute-api.us-east-1.amazonaws.com/default/scrape_twitter_api";
    this.httpCache = new HTTPCache();
  }

  async getWords(terms, language, maxTweets) {
    console.log(maxTweets)
    const words = await this.post("/", {
      terms,
      lang: language || 'es',
      max_tweets: maxTweets || 500
    });
    return words
  }
}
module.exports = { TwitterWordsAPI };
