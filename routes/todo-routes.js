const path = require('path');

const express = require('express');

const todoController = require('../controllers/todo-controller');

const router = express.Router();

router.get('/', todoController.getIndex);
router.post('/add', todoController.postTask);
router.get('/about', todoController.getAbout);
router.post('/edit-task', todoController.editTask);
router.post('/delete-all-tasks', todoController.deleteAllTask);
router.post('/delete-task', todoController.deleteTask);

module.exports = router;