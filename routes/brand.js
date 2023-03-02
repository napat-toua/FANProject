var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', brandController.index);
router.get('/:id', brandController.show);
router.post('/', [passportJWT.isLogin, checkAdmin.isAdmin], [
    body('name').not().isEmpty().withMessage("Name can't be Empty"),
    body('site').not().isEmpty().withMessage("Site can't be Empty")
], brandController.insert);
router.delete('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], brandController.drop);
router.put('/:id', [
    body('name').not().isEmpty().withMessage("Name can't be Empty"),
    body('site').not().isEmpty().withMessage("Site can't be Empty")
], [passportJWT.isLogin, checkAdmin.isAdmin], brandController.update);

module.exports = router;