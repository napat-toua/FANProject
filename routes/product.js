var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.index);
router.get('/:id', productController.show);
router.post('/', productController.insert);
router.delete('/:id', productController.drop);
router.put('/:id', productController.update);

module.exports = router;