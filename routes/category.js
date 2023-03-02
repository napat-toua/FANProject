var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.post('/', [passportJWT.isLogin, checkAdmin.isAdmin], [
    body('name').not().isEmpty().withMessage("Name can't be Empty"),
    body('describe').not().isEmpty().withMessage("Site can't be Empty")
], categoryController.insert);
router.delete('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], categoryController.drop);
router.put('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], [
    body('name').not().isEmpty().withMessage("Name can't be Empty"),
    body('describe').not().isEmpty().withMessage("Site can't be Empty")
], categoryController.update);

module.exports = router;