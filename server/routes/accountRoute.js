var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accountController')

/* GET users listing. */
router.get('/', accountController.findAll);
router.post('/create', accountController.create);

module.exports = router;
