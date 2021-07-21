const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const url = 'http://localhost:4001/movies/'

class MovieController {
    static async getAll(req, res, next) {
        try {
          const movieCache = await redis.get('movies')
          if (movieCache) {
            console.log("from cache");
            res.status(200).json(JSON.parse(movieCache))
          } else {
            console.log("from api call");
            axios.get(url)
            .then( async (movies) => {
              await redis.set('movies', JSON.stringify(movies.data))
              res.status(200).json(movies.data)
            })
          }
        } catch (error) {
          next(error)
        }
      }
    
      static async getOne(req, res, next) {
        try {
          const movieCache = await redis.get('movies')
          const { id } = req.params
          if (movieCache) {
            const foundMovie = JSON.parse(movieCache).filter(item => item._id === id)
            return res.status(200).json(foundMovie[0])
          } else {
            axios.get(url, id)
            .then((movie))
            res.status(200).json(movie.data)
          }
        } catch (error) {
          next(error)
        }
      }
    
      static async add(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body
        const dataMovie = { title, overview, poster_path, popularity, tags }
        try {
          const { data } = await axios.post(url, dataMovie)
          await redis.del('movies')
          res.status(201).json({ data })
        } catch (error) {
          next(error)
        }
      }
    
      static async update(req, res, next) {
        const { id } = req.params
        const { title, overview, poster_path, popularity, tags } = req.body
        const dataMovie = { title, overview, poster_path, popularity, tags }
        try {
          const { data } = await axios.put(`${url}${id}`, dataMovie)
          await redis.del('movies')
          res.status(200).json({ message: data.message })
        } catch (error) {
          next(error)
        }
      }

      static async delete(req, res, next) {
        const { id } = req.params
        try {
          const { data } = await axios.delete(`${url}${id}`)
          await redis.del('movies')
          res.status(200).json({ message: data.message })
        } catch (error) {
          next(error)
        }
      }
}

module.exports = MovieController;