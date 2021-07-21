import { gql } from '@apollo/client'
import client from '../config/client'

export const GET_FAVORITES = gql`
  query {
    favorites {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
    }
  }
`

client.writeQuery({
  query: GET_FAVORITES,
  data: {
    favorites: [{
      _id: "60cb816962cb3b70609a9360",
      title: "Captain America",
      overview: "It is 1941 and the world is in the throes of war. Steve Rogers (Chris Evans) wants to do his part and join America's armed forces, but the military rejects him because of his small stature. Finally, Steve gets his chance when he is accepted into an experimental program that turns him into a supersoldier called Captain America. Joining forces with Bucky Barnes (Sebastian Stan) and Peggy Carter (Hayley Atwell), Captain America leads the fight against the Nazi-backed HYDRA organization.",
      poster_path: "https://flxt.tmsimg.com/assets/p8205710_p_v13_ao.jpg",
      popularity: 9.4,
      tags: ["Action", "Sci-Fi", "Others"],
    }]
  }
})