import React from 'react'
import { useQuery } from '@apollo/client'
import { AiFillTags } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { FETCH_ONE_SERIAL } from '../queries/series'
import Loader from 'react-loader-spinner'

const SerialDetail = () => {
  const { id } = useParams()
  const { loading, data } =  useQuery(FETCH_ONE_SERIAL, { variables: { _id: id } })

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
    }

  }
    return (
      <>
      <div className="container">
        <div className="row mt-5 ml-4" >
          <div className="col-4">
              <img src={data.serial.poster_path} className="card-img-top" style={{width:400, boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)'}} alt={data.serial.title} />
          </div>
          <div className="col-6" >
            <div style={{marginTop: '80px'}}>
              <div className="card-body text-white">
                <h5 className="card-title text-white" style={{ fontSize: "30px" }}>{data.serial.title.toUpperCase()}</h5>
                <p className="card-text">{data.serial.overview}</p>
                <div className="row mt-4 mb-2">
                  <p className="card-text" style={{ color:'black', height: '60px', lineHeight: '2'}}>
                    { data.serial.tags.map((tag,index) => {
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
                    <p style={{backgroundColor:'#0f3f5f'}} className="card-text">Rating: {data.serial.popularity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
}

export default SerialDetail;