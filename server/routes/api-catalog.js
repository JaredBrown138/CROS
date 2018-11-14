const express = require('express');
const router = express.Router();

const test_controller = require('../controllers/test-controller');
const user_controller = require('../controllers/user-controller');
const log_controller = require('../controllers/log-controller');
var checkToken = require("../helpers/check-token");
var checkRole = require("../helpers/check-role");


router.get('/test', test_controller.index);

router.post('/users', user_controller.register);
router.get('/users', [checkToken, checkRole], user_controller.list);
router.delete('/users/:id', [checkToken, checkRole], user_controller.delete);
router.put('/users', [checkToken, checkRole], user_controller.update);

router.post('/login', user_controller.login);
router.get('/logs', [checkToken, checkRole], log_controller.getLog);

module.exports = router;
