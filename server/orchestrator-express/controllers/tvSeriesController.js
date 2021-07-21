const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const url = 'http://localhost:4002/tvSeries/'

class TVSeriesController {
  static async getAll(req, res, next) {
    try {
      const seriesChache = await redis.get('tvSeries')
      if (seriesChache) {
        console.log("from cache");
        res.status(200).json(JSON.parse(seriesChache))
      } else {
        console.log("from api call");
        axios.get(url)
        .then( async (series) => {
          await redis.set('tvSeries', JSON.stringify(series.data))
          res.status(200).json(series.data)
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req, res, next) {
    try {
      const seriesChache = await redis.get('tvSeries')
      const { id } = req.params
      if (seriesChache) {
        const foundSerial = JSON.parse(seriesChache).filter(item => item._id === id)
        return res.status(200).json(foundSerial[0])
      } else {
        axios.get(url, id)
        .then((series))
        res.status(200).json(series.data)
      }
    } catch (error) {
      next(error)
    }
  }
    
  static async add(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body
    let dataSeries = { title, overview, poster_path, popularity, tags }
    try {
      const { data } = await axios.post(url, dataSeries)
      await redis.del('tvSeries')
      res.status(201).json({ data })
    } catch (error) {
      next(error)
    }
  }
    
  static async update(req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    const dataSeries = { title, overview, poster_path, popularity, tags }
    try {
      const { data } = await axios.put(url, id, dataSeries)
      await redis.del('tvSeries')
      res.status(200).json({ message: data.message })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axios.delete(url, id)
      await redis.del('tvSeries')
      res.status(200).json({ message: data.message })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TVSeriesController;