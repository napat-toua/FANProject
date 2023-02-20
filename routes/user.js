var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

/* GET users listing. */
router.get('/', userController.index);

router.get('/:id', userController.show);

router.post('/', [
  body('name').not().isEmpty().withMessage("Name can't be Empty"),
  body('email').not().isEmpty().withMessage("Email can't be Empty").isEmail().withMessage("Email format invalid"),
  body('password').not().isEmpty().withMessage("Password can't be Empty").isLength({ min: 5 }).withMessage("Password must contain at least 5 characters")
], userController.register);

router.delete('/:id', userController.drop);

router.put('/:id', [
  body('name').not().isEmpty().withMessage("Name can't be Empty"),
  body('email').not().isEmpty().withMessage("Email can't be Empty").isEmail().withMessage("Email format invalid"),
  body('password').not().isEmpty().withMessage("Password can't be Empty").isLength({ min: 5 }).withMessage("Password must contain at least 5 characters")
], userController.update);

module.exports = router;
