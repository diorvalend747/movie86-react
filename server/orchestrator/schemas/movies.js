const { gql } = require('apollo-server')

const typeDefMovie = gql`
  # Movie
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  input MovieInput {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
`

module.exports = typeDefMovie