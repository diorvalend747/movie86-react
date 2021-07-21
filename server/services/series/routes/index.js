const router = require('express').Router()
const tvSeriesRouter = require('./tvSeriesRouter')

router.use('/tvSeries', tvSeriesRouter)

module.exports = router;