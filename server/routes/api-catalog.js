const express = require('express');
const router = express.Router();

const test_controller = require('../controllers/test-controller');
const user_controller = require('../controllers/user-controller');
const log_controller = require('../controllers/log-controller');
const question_controller = require('../controllers/question-controller');
const order_controller = require('../controllers/order-controller');
const message_controller = require('../controllers/message-controller');

var checkToken = require("../helpers/check-token");
var checkRole = require("../helpers/check-role");


router.get('/test', test_controller.index);

router.post('/users', user_controller.register);
router.get('/users', [checkToken, checkRole], user_controller.list);
router.delete('/users/:id', [checkToken, checkRole], user_controller.delete);
router.put('/users', [checkToken, checkRole], user_controller.update);

router.post('/questions', [checkToken, checkRole], question_controller.addQuestion);
router.get('/questions', [checkToken, checkRole], question_controller.getQuestions);
router.delete('/questions/:id', [checkToken, checkRole], question_controller.delete);

router.post('/orders', [checkToken, checkRole], order_controller.submit);
router.get('/orders', [checkToken, checkRole], order_controller.list);
router.get('/stats', [checkToken, checkRole], order_controller.stats);


router.post('/messages', message_controller.send);
router.get('/messages', [checkToken, checkRole], message_controller.list);
router.put('/messages', [checkToken, checkRole], message_controller.read);

router.post('/login', user_controller.login);
router.get('/logs', [checkToken, checkRole], log_controller.getLog);

module.exports = router;
