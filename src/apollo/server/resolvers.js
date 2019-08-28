const resolvers = {
  Query: {
    words: async (parent, args, { dataSources }) => {
      const {terms, language, maxTweets} = args
      const words = await dataSources.twitterWordsAPI.getWords(terms, language, maxTweets)
      return words
    }
  }
}

module.exports = resolvers
