const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error-controller');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const toDo = require('./routes/todo-routes');
const user = require('./routes/user-routes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(toDo);
app.use(user);
app.use(errorController.get404);


mongoose
  .connect(
    'mongodb+srv://soumyasp35:jlz3q806Rm1l1BLP@cluster0.t6vmiqm.mongodb.net/todo?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });