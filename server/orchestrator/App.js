const { ApolloServer, gql } = require('apollo-server');
const { merge } = require('lodash')
const typeDefMovie = require('./schemas/movies')
const resolverMovie = require('./resolvers/movies')
const typeDefSeries = require('./schemas/tvSeries')
const resolverSeries = require('./resolvers/tvSeries')

const typeDefsRoot = gql`
  type Query {
    movies: [Movie]
    movie(_id: ID!): Movie
    series: [Series]
    serial(_id: ID!): Series
  }

  type Message {
    message: String
  }

  type Mutation {
    addMovie(input: MovieInput): Movie
    updateMovie(input: MovieInput): Message
    deleteMovie(input: MovieInput): Message
    addSeries(input: SeriesInput): Series
    updateSeries(input: SeriesInput): Message
    deleteSeries(input: SeriesInput): Message
  }
`

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer(
  {
    typeDefs: [typeDefMovie, typeDefSeries, typeDefsRoot],
    resolvers: merge(resolverMovie, resolverSeries),
    formatError: (err) => {
      if (err.message === "Request failed with status code 404") {
        return new Error('Error 404 Not Found');
      } else {
        return new Error('Internal Server Error')
      }
    } 
  }
);

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});