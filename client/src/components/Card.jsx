import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import '../Card.css';

export const Card = ({ data, path }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  
  const styles = {
    card: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      marginBottom: 10,
    },
    img: {
      height: '400px',
      width: '280px',
    },
    tagBox: {
      backgroundColor: 'white',
      padding: 4,
      width: "100%",
      fontSize: 12,
      marginRight: "2%",
    },
    popularity: {
      color: 'white',
      borderRadius: '32px',
      padding: '5px',
      paddingLeft: '7px',
      paddingRight: '7px',
      marginTop: '8px',
      width: '100%',
      marginBottom: '9px',
    },
    infoBtn: {
      width: '100%', 
      backgroundColor: '#d35400' , 
      borderColor: '#d35400', 
      color: "white",
    }
  }

  const toDetails = () => {
    history.push({
      pathname: `${path}/${data._id}`,
      fromFavorites: pathname === '/favorites' ? true : false
    })
  }

  return (
    <>
      <div className="card" style={ styles.card } onClick={() => toDetails()}>
        <div style={{overflow: 'hidden', padding:'25px', paddingBottom: 0}}>
          <img src={ data.poster_path } className="card-img-top" style={ styles.img } alt={ data.title }/>
          <p style={ styles.popularity } className="text-center"> 
          </p>
        </div>
        
        <div className="card-body" style={{paddingTop: '3px'}}>
          <h4 style={{color: '#bdc3c7', fontSize:'30px'}}> { data.title }</h4><br />
        </div>
      </div>
    </>
  )
}