var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accountController')

/* GET users listing. */
router.get('/', accountController.findAll);
router.post('/create', accountController.create);
router.put('/update/:accountId', accountController.update);
router.delete('/delete/:accountId', accountController.destroy);

module.exports = router;
