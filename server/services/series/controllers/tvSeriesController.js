const TVSeries = require('../models/TVSeries')

class TVSeriesController {
  static async getAll(req, res, next) {
    try {
      const tvSeries = await TVSeries.getAll()
      res.status(200).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = req.params.id
      const tvSeries = await TVSeries.getOne(id)
      res.status(200).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      let { title, overview, poster_path, popularity, tags } = req.body
      popularity = parseFloat(popularity)
      let data = { title, overview, poster_path, popularity, tags }

      const tvSeries = await TVSeries.add(data)
      res.status(201).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      let { title, overview, poster_path, popularity, tags } = req.body
      popularity = parseFloat(popularity)
      let data = { title, overview, poster_path, popularity, tags }

      const series = await TVSeries.update(id, data)
      res.status(200).json({ message: "TV Series updated!" })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id
      const deletedTVSeries = await TVSeries.delete(id)
      res.status(200).json({ message: "Removed Successfully" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TVSeriesController