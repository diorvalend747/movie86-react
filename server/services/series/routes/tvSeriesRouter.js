const router = require('express').Router()
const TVSeriesController = require('../controllers/tvSeriesController')

router.get('/', TVSeriesController.getAll)
router.get('/:id', TVSeriesController.getOne)
router.post('/', TVSeriesController.add)
router.put('/:id', TVSeriesController.update)
router.delete('/:id', TVSeriesController.delete)

module.exports = router;