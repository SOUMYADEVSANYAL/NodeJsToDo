const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error-controller');
const User = require('./models/user-schema');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const toDo = require('./routes/todo-routes');
const user = require('./routes/user-routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65cb016a96f9735444692c84')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(toDo);
app.use(user);
app.use(errorController.get404);


mongoose
  .connect(
    'mongodb+srv://soumyasp35:jlz3q806Rm1l1BLP@cluster0.t6vmiqm.mongodb.net/todo?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Nick',
          email: 'nick@zpd.com',
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });