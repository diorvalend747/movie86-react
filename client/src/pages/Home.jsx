import React from 'react'
import { FETCH_HOME } from '../queries/index'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_HOME)

  if (loading) {
    return (
        <Loader
        className=""
        type="ThreeDots"
        color="White"
        height={100}
        width={100}
        timeout={3000}
      /> 
    )
  }

  if (error) {
    return <p> {JSON.stringify(error)} </p>
  }

  return (
    <>
    <div className="container">
        <div className="row mb-3">
            <div className="col-10">
                <h1 className="text-white" style={{fontSize:40}}>Movies</h1>
            </div>
            <div className="col-2" style={{paddingLeft: '7%'}}>
                <Link className="btn" style={{backgroundColor: '#c0392b', borderColor:'#c0392b', color: "white"}} to={'/addMovie'}> Add Movie </Link>
            </div>
        </div>
        <div className="row">
            {data.movies.map(movie => {
            return (
                <div className="col-3" key={ movie._id }> 
                <Card data={ movie } path={ "/movies" } key={ movie._id }/>
                </div>
                )
            })
            }
        </div>
        <hr style={{backgroundColor: 'red'}}/>
        <h1 className="text-white mb-3 mt-5" style={{fontSize:40}}>TV Series</h1>
        <div className="row">
            {data.series.map(serial => {
            return (
                <div className="col-3" key= {serial._id }> 
                <Card data={ serial } path={ "/tvSeries" } key={ serial._id }/>
                </div>
                )
            })
            }
        </div>
      </div>
    </>
  ) 
}

export default Home;