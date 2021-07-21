import { gql } from '@apollo/client'

export const FETCH_MOVIES = gql`
  query fetchMovies {
    movies {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const FETCH_ONE_MOVIE = gql`
  query($_id: ID!) {
    movie(_id: $_id) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation ($newOne: MovieInput) {
    addMovie(input: $newOne) {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation ($MovieInput: MovieInput) {
    updateMovie(input: $MovieInput) {
      message
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation ($_id: MovieInput) {
    deleteMovie(input: $_id) {
      message
    }
  }
`