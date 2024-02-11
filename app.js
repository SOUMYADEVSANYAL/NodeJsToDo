const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const errorController = require('./controllers/error-controller');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const toDo = require('./routes/todo-routes');
const user = require('./routes/user-routes');

app.use(toDo);
app.use(user);
app.use(errorController.get404);


app.listen(3000);