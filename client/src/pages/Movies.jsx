import React from 'react'
import { FETCH_MOVIES } from '../queries/movies'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { useLocation, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-pro-sidebar/dist/css/styles.css';


const Movies = () => {
  const { pathname } = useLocation()
  const { loading, error, data } = useQuery(FETCH_MOVIES)

  if (loading) {
    return <Loader
    className=""
    type="ThreeDots"
    color="Gray"
    height={100}
    width={100}
    timeout={3000}
    /> 
  }

  if (error) {
    return <p> {JSON.stringify(error)} </p>
  }

  return (
    <>
        <div className="container">
      <div className="row mb-5">
      <div className="col-10">
        <h1 className="text-white" style={{fontSize:40}}>Best Movies</h1>
      </div>
      <div className="col-2" style={{paddingLeft: '7%'}}>
        <Link className="btn" style={{backgroundColor: '#c0392b', borderColor:'#c0392b', color: "white"}} to={'/addMovie'}> Add Movie </Link>
      </div>
    </div>
      <div className="row">
      {
        data.movies.map(movie => {
          return (
            <div className="col-3" key={movie._id}> 
              <Card data={ movie } path={ pathname } key={movie._id}/>
            </div>
            )
          })
      }
      </div>
      </div>
    </>
  )
}

export default Movies;