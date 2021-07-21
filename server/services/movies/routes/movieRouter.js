const router = require('express').Router()
const MovieController = require('../controllers/movieController')

router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getOne)
router.post('/', MovieController.add)
router.put('/:id', MovieController.update)
router.delete('/:id', MovieController.delete)

module.exports = router;