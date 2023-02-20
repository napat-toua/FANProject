var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')

router.get('/', brandController.index);
router.get('/:id', brandController.show);
router.post('/', brandController.insert);
router.delete('/:id', brandController.drop);
router.put('/:id', brandController.update);

module.exports = router;