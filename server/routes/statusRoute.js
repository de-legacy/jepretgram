var express = require('express');
var router = express.Router();
var statusController = require('../controllers/statusController')
var helper = require('../helpers/helper')
const multer = require('multer')
const upload = multer({});
const fileUpload = require('../helpers/fileUpload');

/* GET home page. */
router.get('/', statusController.findAll);
router.get('/:statusId', statusController.findById);
router.post('/', fileUpload.multer.single('image'), fileUpload.sendUploadToGCS, statusController.create);
router.delete('/:statusId', statusController.destroy);
router.put('/:statusId', statusController.update);


module.exports = router;