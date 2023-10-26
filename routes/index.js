var express = require('express');
var router = express.Router();
const Validator = require('../validators/validate')

const UsersController = require('../controllers').User
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/signup', Validator.validateUsers, UsersController.signUp)
router.post('/api/login', Validator.validateLogin, UsersController.login)


module.exports = router;
