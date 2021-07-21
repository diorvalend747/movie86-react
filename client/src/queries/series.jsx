import { gql } from '@apollo/client'

export const FETCH_SERIES = gql`
  query fetchSeries {
    series{
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const FETCH_ONE_SERIAL = gql`
  query fetchOneSerial($_id: ID!) {
    serial(_id: $_id){
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`