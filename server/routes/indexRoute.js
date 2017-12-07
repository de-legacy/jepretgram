var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accountController')
var helper = require('../helpers/helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({title: "Jepretgram"});
});

router.post('/api/signin', helper.signIn, accountController.signIn)

module.exports = router;
