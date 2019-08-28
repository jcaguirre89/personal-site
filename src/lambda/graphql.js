const { ApolloServer, gql } = require("apollo-server-lambda");
const {TwitterWordsAPI} = require("../apollo/server/twitter-datasource")
const resolvers = require("../apollo/server/resolvers")
const typeDefs = gql`
  type Query {
    words(terms: String!, language: String,
    maxTweets: Int): [String]
  }`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    twitterWordsAPI: new TwitterWordsAPI()
  })
});

exports.handler = server.createHandler();
