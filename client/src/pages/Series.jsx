import React from 'react'
import { FETCH_SERIES } from '../queries/series'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-pro-sidebar/dist/css/styles.css';


const TVSeries = () => {
  const { pathname } = useLocation()
  const { loading, error, data } =  useQuery(FETCH_SERIES)

  if (loading) {
    return <Loader
    className=""
    type="ThreeDots"
    color="White"
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
      <h1 className="text-white mb-5" style={{fontSize:40}}>Best TV Series</h1>
      <div className="row">
      {
        data.series.map((series) => {
          return (
            <div className="col-3" key={series._id}> 
              <Card data={series} key={series._id} path={pathname}/>
            </div>
            )
        })
      }
      </div>
      </div>
    </>
  )
}

export default TVSeries;