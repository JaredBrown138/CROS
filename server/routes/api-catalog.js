var express = require('express');
var router = express.Router();

let test_controller = require('../controllers/test-controller');


router.get('/test', test_controller.index);


module.exports = router;
