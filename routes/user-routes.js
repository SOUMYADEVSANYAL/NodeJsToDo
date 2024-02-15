const path = require('path');

const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

router.get('/login', userController.getSignIn);
router.get('/signup', userController.getSignUp);
router.post('/signup', userController.postSignUp);
router.post('/login', userController.postSignIn);

module.exports = router;