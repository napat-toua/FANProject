var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.post('/', categoryController.insert);
router.delete('/:id', categoryController.drop);
router.put('/:id', categoryController.update);

module.exports = router;