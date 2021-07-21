const Movie = require('../models/Movie')

class MovieController {
  static async getAll(req, res, next) {
    try {
      const movies = await Movie.getAll()
      res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = req.params.id
      const movie = await Movie.getOne(id)
      res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      let { title, overview, poster_path, popularity, tags } = req.body
      popularity = parseFloat(popularity)
      let movieData = { title, overview, poster_path, popularity, tags }
      const movie = await Movie.add(movieData)
      res.status(201).json(movie)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      let { title, overview, poster_path, popularity, tags } = req.body
      popularity = parseFloat(popularity)
      let movieData = { title, overview, poster_path, popularity, tags }

      const movie = await Movie.update(id, movieData)
      res.status(200).json({ message: "Movie updated!" })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id
      const deletedMovie = await Movie.delete(id)
      res.status(200).json({ message: "Removed Successfully" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController