const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();
const url = 'http://localhost:4002/tvSeries/'

const resolverSeries = {
  Query: {
    series: async () => {
      try {
        const cache = await redis.get('tvSeries')
        if (cache) {
          console.log("from cache");
          return JSON.parse(cache)
        } else {
          console.log("from api call");
          const series = await axios.get(url)
          await redis.set('tvSeries', JSON.stringify(series.data))
          return series.data
        }
      } catch (error) {
        throw error
      }
    },
    serial: async (_, args) => {
      try {
        const cache = await redis.get('tvSeries')
        if (cache) {
          const foundSerial = JSON.parse(cache).filter(serial => serial._id === args._id)
          return foundSerial[0]
        } else {
          const foundSerial = await axios.get(url, args._id)
          return foundSerial.data
        }
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addSeries: async (_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags } = args.input
        const dataSeries = { title, overview, poster_path, popularity, tags }
        const { data } = await axios.post(url, dataSeries)
        await redis.del('tvSeries')
        return { data }
      } catch (error) {
        throw error
      }
    },
    updateSeries: async (_, args) => {
      try {
        const { _id, title, overview, poster_path, popularity, tags } = args.input
        const dataSeries = { title, overview, poster_path, popularity, tags }
        const { data } = await axios.put(`${url}${_id}`, dataSeries)
        await redis.del('tvSeries')
        return { message: data.message }
      } catch (error) {
        throw error
      }
    },
    deleteSeries: async (_, args) => {
      try {
        const { _id } = args.input
        const { data } = await axios.delete(`${url}${_id}`)
        await redis.del('tvSeries')
        return { message: data.message }
      } catch (error) {
        throw error
      }
    }
  }
};

module.exports = resolverSeries