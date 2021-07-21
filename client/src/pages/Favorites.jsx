import React from 'react'
import { Card } from '../components/Card'
import { GET_FAVORITES } from '../queries/favorites'
import client from '../config/client'
import 'react-pro-sidebar/dist/css/styles.css';

const Favorites = () => {
  const  {favorites} = client.readQuery({
    query: GET_FAVORITES
  })

  return (
    <>
    <div className="container">
      <div className="row mb-5">
      <div className="col-10">
      <h1 className="text-white" style={{fontSize:40}}>My Favorites</h1>
      </div>
    </div>
      <div className="row">
      {
        favorites.map( movie => {
          return (
            <div className="col-3" key={movie._id}> 
              <Card data={movie} path={"movies"}/>
            </div>
            )
          })
      }
      </div>
      </div>
    </>
  )
}

export default Favorites;