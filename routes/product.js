var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', productController.index);

router.get('/:id', productController.show);

router.post('/', [passportJWT.isLogin, checkAdmin.isAdmin], [
    body('name').not().isEmpty().withMessage("Name can't be Empty"),
    body('price').not().isEmpty().withMessage("Price can't be Empty").isDecimal().withMessage("Price must be decimal number"),
    body('brand').not().isEmpty().withMessage("Brand can't be Empty").isMongoId().withMessage("MongoDB ObjectId format invalid"),
    body('category').not().isEmpty().withMessage("Category can't be Empty").isMongoId().withMessage("MongoDB ObjectId format invalid"),
], productController.insert);

router.delete('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], productController.drop);

router.put('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], [
    body('name').not().isEmpty().withMessage("Name can't be Empty"),
    body('price').not().isEmpty().withMessage("Price can't be Empty").isDecimal().withMessage("Price must be decimal number"),
    body('brand').not().isEmpty().withMessage("Brand can't be Empty").isMongoId().withMessage("MongoDB ObjectId format invalid"),
    body('category').not().isEmpty().withMessage("Category can't be Empty").isMongoId().withMessage("MongoDB ObjectId format invalid")
], productController.update);

module.exports = router;