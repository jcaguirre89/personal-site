const resolvers = {
  Query: {
    words: async (parent, args, { dataSources }) => {
      const words = await dataSources.twitterWordsAPI.getWords(...args)
      return words
    }
  }
}

module.exports = resolvers
