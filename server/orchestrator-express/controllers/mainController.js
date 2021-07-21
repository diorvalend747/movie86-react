const axios = require('axios');

class MainController {
    static async getAll (req, res) {
        axios.get('http://localhost:4001/movies')
          .then((movies) => {
            axios.get('http://localhost:4002/tvSeries')
            .then((tvSeries) => {
                res.status(200).json({
                  movies: movies.data,
                  tvSeries: tvSeries.data
                })
            })
            .catch((error) => {
              console.log(error);
            })
          })
          .catch((error) => {
            console.log(error);
          })
    }
}   

module.exports = MainController;