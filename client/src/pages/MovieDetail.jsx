import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { AiFillTags } from 'react-icons/ai';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import { FETCH_ONE_MOVIE, FETCH_MOVIES, DELETE_MOVIE } from '../queries/movies'
import { GET_FAVORITES } from '../queries/favorites'
import Loader from 'react-loader-spinner'
import client from '../config/client'

const MovieDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [getInputMovie, setInputMovie] = useState(null)

  const { loading, data } =  useQuery(FETCH_ONE_MOVIE, { variables: { _id: id }})

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
      refetchQueries: [{
        query: FETCH_MOVIES
      }]
    }
  );

  useEffect(() => {
    if (data) {
      setInputMovie({
        _id: data.movie._id
      })
    }
  }, [data])

  const submitDelete = () => {
    deleteMovie({ variables: { _id: getInputMovie }} )
    history.push('/movies')
  }

  const addToFavorites = () => {
    const { favorites: currentFavorites } = client.readQuery({
      query: GET_FAVORITES
    })

    client.writeQuery({
      query: GET_FAVORITES,
      data: {
        favorites: currentFavorites.concat(data.movie)
      }
    })
    history.push('/favorites')
  }

  const removeFromFavorites = (_id) => {
    const { favorites : currentFavorites } = client.readQuery({
      query: GET_FAVORITES
    })

    client.writeQuery({
      query: GET_FAVORITES,
      data: {
        favorites: currentFavorites.filter(fav => fav._id !== _id)
      }
    })
    history.push('/favorites')
  }

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

  const styles = {
    tagBox: {
      backgroundColor: 'white',
      padding: 4,
      width: "100%",
      fontSize: 12,
      marginRight: "2%",
    },
  }

    return (
      <>
      <div className="container">
        <div className="row mt-5 ml-4" >
          <div className="col-4">
              <img src={data.movie.poster_path} className="card-img-top" style={{width:400, boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)'}} alt={data.movie.title} />
          </div>
          <div className="col-6" >
            <div style={{marginTop: '80px'}}>
              <div className="card-body text-white">
                <h5 className="card-title text-white" style={{ fontSize: "30px" }}>{data.movie.title.toUpperCase()}</h5>
                <p className="card-text">{data.movie.overview}</p>
                <div className="row mt-4 mb-2">
                  <p className="card-text" style={{ color:'black', height: '60px', lineHeight: '2'}}>
                    { data.movie.tags.map((tag,index) => {
                      return (
                        <>
                          <span style={ styles.tagBox }><AiFillTags/>{`${tag}`} &nbsp;</span>
                          {
                            (index + 1) % 3 === 0 ? <> 
                            <br style={{ lineHeight:'22px' }}/><br/>
                            </> : null 
                          }
                        </>
                      )
                    })
                  }
                  </p>          
                  <div className="col-3 text-center" style={{ height: '60px', lineHeight: '2'}}>
                    <p style={{backgroundColor:'#0f3f5f'}} className="card-text">Rating: {data.movie.popularity}</p>
                  </div>
                </div>
                <div className="row">
                  {
                    location.fromFavorites ? 
                    <div className="col-8">
                      <button onClick={() => removeFromFavorites(data.movie._id) } className="btn" style={{backgroundColor: '#c0392b', borderColor:'#c0392b', color: "white"}}>Remove from Favorites</button>
                    </div>
                  :
                    <>
                      <div className="col-8">
                        <button onClick={() => addToFavorites() } className="btn btn-outline-danger">Add to Favorites</button>
                        <Link to={`/update/${data.movie._id}`} className="btn" style={{backgroundColor: '#192a56', borderColor:'#192a56', color: "white", marginLeft: "30px"}}>Update</Link>
                        <button onClick={() => submitDelete() } className="btn" style={{backgroundColor: '#c0392b', borderColor:'#c0392b', color: "white", marginLeft: "30px"}}>Delete</button>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
}

export default MovieDetail;