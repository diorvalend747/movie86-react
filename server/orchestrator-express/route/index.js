const router = require('express').Router()
const movieRouter = require('./movieRouter')
const tvSeriesRouter = require('./tvSeriesRouter')
const mainController = require('../controllers/mainController')

router.get('/', mainController)
router.use('/movies', movieRouter)
router.use('/tvSeries', tvSeriesRouter)

module.exports = router;