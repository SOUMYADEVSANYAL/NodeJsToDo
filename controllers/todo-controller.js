const Task = require('../models/task-schema');
exports.getIndex = (req, res, next) =>{
    Task.find({ userId: req.user._id }) // Fetch tasks with userId matching req.user._id
    .then(tasks => {
        res.render('index', {
            tasks: tasks,
            userName: req.user.name,
            path: '/'
        });
    })
    .catch(error => {
        // Handle errors
        console.error("Error fetching tasks:", error);
        res.status(500).send("Error fetching tasks");
    });
}

exports.postTask = (req, res, next) =>{
    const taskTitle = req.body.title;
    const taskDescription = req.body.description;
    const task = new Task({
        title: taskTitle,
        description: taskDescription,
        userId: req.user._id,
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

exports.deleteTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Task.findByIdAndRemove(taskId).then(()=>{
        res.redirect('/');
    })
}
exports.editTask = (req, res, next) => {
    const taskId = req.body.taskId;
    const updatedTaskTitle = req.body.editTitle;
    const updatedTaskDescription = req.body.editDescription;
    Task.findById(taskId)
    .then((task) => {
        task.title = updatedTaskTitle;
        task.description = updatedTaskDescription;
        return task.save();
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.deleteAllTask = (req, res, next) => {
    Task.deleteMany()
    .then(() => {
        res.redirect('/');
    });
}