module.exports = (err, req, res, next) => {
    console.log(err.message);
    if (err.message === 'Request failed with status code 404') {
      res.status(404).json({ message: 'Error Not Found' })
    } else if (err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
}