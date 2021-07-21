import { gql } from '@apollo/client'

export const FETCH_HOME = gql`
    query getAll {
        movies {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags,
        }
        series {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags,
        }
    }
`