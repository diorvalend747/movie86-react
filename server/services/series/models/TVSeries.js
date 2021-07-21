const { getDatabase } = require('../config/mongo')
const { ObjectId } = require('mongodb') 

class TVSeries {
  static getAll() {
    return getDatabase().collection("tvSeries").find().toArray()
  }

  static getOne(id) {
    return getDatabase().collection("tvSeries").findOne({ "_id": ObjectId(id) })
  }

  static add(series) {
    return getDatabase().collection("tvSeries").insertOne(series)
  }

  static async update(id, series) {
    return getDatabase().collection("tvSeries").updateOne({ "_id": ObjectId(id) }, { $set: series })
  }

  static async delete(id) {
    return getDatabase().collection("tvSeries").deleteOne({ "_id": ObjectId(id) })
  }
}

module.exports = TVSeries