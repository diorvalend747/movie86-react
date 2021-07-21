const { gql } = require('apollo-server')

const typeDefSeries = gql`
  # Series
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  input SeriesInput {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
`

module.exports = typeDefSeries