var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', [passportJWT.isLogin, checkAdmin.isAdmin], userController.index);

router.get('/profile', [passportJWT.isLogin], userController.profile);

router.put('/profile', [passportJWT.isLogin], [
  body('name').not().isEmpty().withMessage("Name can't be Empty"),
  body('email').not().isEmpty().withMessage("Email can't be Empty").isEmail().withMessage("Email format invalid"),
  body('password').not().isEmpty().withMessage("Password can't be Empty").isLength({ min: 5 }).withMessage("Password must contain at least 5 characters")
], userController.put_profile);

router.post('/', [
  body('name').not().isEmpty().withMessage("Name can't be Empty"),
  body('email').not().isEmpty().withMessage("Email can't be Empty").isEmail().withMessage("Email format invalid"),
  body('password').not().isEmpty().withMessage("Password can't be Empty").isLength({ min: 5 }).withMessage("Password must contain at least 5 characters")
], userController.register);

router.post('/login', [
  body('email').not().isEmpty().withMessage("Email can't be Empty").isEmail().withMessage("Email format invalid"),
  body('password').not().isEmpty().withMessage("Password can't be Empty").isLength({ min: 5 }).withMessage("Password must contain at least 5 characters")
], userController.login);

router.get('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], userController.show);

router.delete('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], userController.drop);

router.put('/:id', [passportJWT.isLogin, checkAdmin.isAdmin], [
  body('name').not().isEmpty().withMessage("Name can't be Empty"),
  body('email').not().isEmpty().withMessage("Email can't be Empty").isEmail().withMessage("Email format invalid"),
  body('password').not().isEmpty().withMessage("Password can't be Empty").isLength({ min: 5 }).withMessage("Password must contain at least 5 characters")
], userController.update);

module.exports = router;
