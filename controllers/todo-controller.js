const Task = require('../models/task-schema');
exports.getIndex = (req, res, next) =>{
    Task.find()
    .then(tasks => {
        res.render('index',{
            tasks: tasks,
            path: '/'
        });
    });
}

exports.postTask = (req, res, next) =>{
    const taskTitle = req.body.title;
    const taskDescription = req.body.description;
    const task = new Task({
        title: taskTitle,
        description: taskDescription
    });
    task.save()
    .then(result => {
        console.log(result);
        console.log('Created Product');
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
}