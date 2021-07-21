import React, { useState } from 'react'
import { ADD_MOVIE, FETCH_MOVIES } from '../queries/movies'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
 
const AddMovie = () => {
  
  const history = useHistory()
  const [newMovie, setNewMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: [],
  })

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{
      query: FETCH_MOVIES
    }]
  })

  const onHandleChange = (e) => {
    const { name, value  } = e.target
    if (name === "tags") {
      if (!newMovie.tags.includes(value)) {
        const newTags = newMovie.tags.concat(value)
        setNewMovie({
          ...newMovie,
          tags: newTags
        })
      } else {
        const newTags = newMovie.tags.filter(tag => tag !== value)
        setNewMovie({
          ...newMovie,
          tags: newTags
        })
      }
    } else {
      if (name === "popularity") {
        setNewMovie({
          ...newMovie,
          [name]: +value
        })
      } else {
        setNewMovie({
          ...newMovie,
          [name]: value
        })
      }
    }
  }
  
  const submitAdd = (e) => {
    e.preventDefault()
    addMovie({
      variables: { newOne: newMovie }
    })
    history.push('/movies')
  }
  
  return (
    <div className="container">
      <h4 className="display-3 text-center" style={{color: "#c0392b"}}>Add Movie</h4>
      <br/>
      <form onSubmit={(e) => submitAdd(e)} >
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Title</label>
          <div className="col-sm-10">
            <input type="text" name="title" className="form-control" id="inputTitle" placeholder="Enter title" required="required" 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.title}/>
          </div>
        </div><br />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Overview</label>
          <div className="col-sm-10">
            <input type="text"  name="overview" className="form-control" id="inputOverview" placeholder="Enter overview" required="required" 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.overview}/>
          </div>
        </div><br />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Poster Path</label>
          <div className="col-sm-10">
            <input type="text"  name="poster_path" className="form-control" id="inputPoster" placeholder="Enter poster link" required="required" 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.poster_path}/>
          </div>
        </div><br />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Popularity</label>
          <div className="col-sm-10">
            <input type="float"  name="popularity" className="form-control" id="inputPopularity" placeholder="Enter popularity" required="required" 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.titlpopularitye}/>
          </div>
        </div><br />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Tags</label>
          <div className="col-sm-3">
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="thriller" id="thriller"/>
              <label htmlFor="thriller" className="form-check-label text-white">
                Thriller
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="horror" id="horror"/>
              <label htmlFor="horror" className="form-check-label text-white">
                Horror
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="animation" id="animation"/>
              <label htmlFor="animation" className="form-check-label text-white">
                Animation
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="comedy" id="comedy"/>
              <label htmlFor="comedy" className="form-check-label text-white">
                Comedy
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="drama" id="drama"/>
              <label htmlFor="drama" className="form-check-label text-white">
                Drama
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="romance" id="romance"/>
              <label htmlFor="romance" className="form-check-label text-white">
                Romance
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="action" id="action"/>
              <label htmlFor="action" className="form-check-label text-white">
                Action
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="scify" id="scify"/>
              <label htmlFor="scify" className="form-check-label text-white">
                Sci-Fi
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="others" id="others"/>
              <label htmlFor="others" className="form-check-label text-white">
                Others
              </label>
            </div>
          </div>
        </div><br /><br /><br /><br />
      <button className="btn" style={{backgroundColor: '#c0392b', borderColor:'#c0392b', color: "white", marginLeft: '600px'}}>Add Movie</button>
      </form>
    </div>
  )
}

export default AddMovie;