const { getDatabase } = require('../config/mongo')
const { ObjectId } = require('mongodb')

class Movie {
  static getAll() {
    return getDatabase().collection("movies").find().toArray()
  }

  static getOne(id) {
    return getDatabase().collection("movies").findOne({ "_id": ObjectId(id) })
  }

  static add(movie) {
    return getDatabase().collection("movies").insertOne(movie)
  }

  static async update(id, movie) {
    return getDatabase().collection("movies").updateOne({ "_id": ObjectId(id) }, { $set: movie } )
  }

  static async delete(id) {
    return getDatabase().collection("movies").deleteOne({ "_id": ObjectId(id) })
  }
}

module.exports = Movie