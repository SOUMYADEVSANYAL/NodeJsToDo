const path = require('path');

const express = require('express');

const todoController = require('../controllers/todo-controller');

const router = express.Router();

router.get('/', todoController.getIndex);
router.post('/add', todoController.postTask);

module.exports = router;