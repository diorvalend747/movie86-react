const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();
const url = 'http://localhost:4001/movies/'

const resolverMovie = {
  Query: {
    movies: async () => {
      try {
        const cache = await redis.get('movies')
        if (cache) {
          console.log("from cache");
          return JSON.parse(cache)
        } else {
          console.log("from api call");
          const movies = await axios.get(url)
          await redis.set('movies', JSON.stringify(movies.data))
          return movies.data
        }
      } catch (error) {
        throw error
      }
    },
    movie: async (_, args) => {
      try {
        const cache = await redis.get('movies')
        if (cache) {
          const foundMovie = JSON.parse(cache).filter(movie => movie._id === args._id)
          return foundMovie[0]
        } else {
          const foundMovie = await axios.get(url, args._id)
          return foundMovie.data
        }
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags } = args.input
        const dataMovie = { title, overview, poster_path, popularity, tags }
        const { data } = await axios.post(url, dataMovie)
        await redis.del('movies')
        return { data }
      } catch (error) {
        throw error
      }
    },
    updateMovie: async (_, args) => {
      try {
        const { _id, title, overview, poster_path, popularity, tags } = args.input
        const dataMovie = { title, overview, poster_path, popularity, tags }
        const { data } = await axios.put(`${url}${_id}`, dataMovie)
        await redis.del('movies')
        return { message: data.message }
      } catch (error) {
        throw error
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const { _id } = args.input
        const { data } = await axios.delete(`${url}${_id}`)
        await redis.del('movies')
        return { message: data.message }
      } catch (error) {
        throw error
      }
    }
  }
};

module.exports = resolverMovie