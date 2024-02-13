const path = require('path');

const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

router.get('/login', userController.getSignIn);
router.get('/signup', userController.getSignUp);

module.exports = router;