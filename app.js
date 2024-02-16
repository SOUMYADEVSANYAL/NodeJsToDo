const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error-controller');
// const User = require('./models/user-schema');

const app = express();
const store = new MongoDBStore({
  uri: 'mongodb+srv://soumyasp35:jlz3q806Rm1l1BLP@cluster0.t6vmiqm.mongodb.net/todo?retryWrites=true&w=majority',
  collection: 'Sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const toDo = require('./routes/todo-routes');
const user = require('./routes/user-routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'This is my secret',
  store: store,
  resave: false,
  saveUninitialized: false
}));

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