const path = require('path');

const express = require('express');

const userController = require('../controllers/user-controller');
const isReachable = require('../middleware/is-reachable');

const router = express.Router();

router.get('/login', isReachable, userController.getSignIn);
router.get('/signup', isReachable, userController.getSignUp);
router.post('/signup', isReachable, userController.postSignUp);
router.post('/login', isReachable, userController.postSignIn);
router.post('/logout', userController.postLogout);

module.exports = router;