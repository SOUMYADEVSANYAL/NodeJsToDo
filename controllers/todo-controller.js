const Task = require('../models/task-schema');
exports.getIndex = (req, res, next) => {
    if (req.session.user) {
        Task.find({ userId: req.session.user._id }) // Fetch tasks with userId matching req.session.user._id
            .then(tasks => {
                res.render('index', {
                    tasks: tasks,
                    userName: req.session.user.name,
                    isAuth: req.session.isLoggedIn,
                    path: '/'
                });
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching tasks:", error);
                res.status(500).send("Error fetching tasks");
            });
    } else {
        Task.find() // Fetch tasks with userId matching req.session.user._id
            .then(tasks => {
                res.render('index', {
                    tasks: [],
                    userName: req.session.user,
                    isAuth: false,
                    path: '/'
                });
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching tasks:", error);
                res.status(500).send("Error fetching tasks");
            });
    }
}

exports.postTask = (req, res, next) => {
    if (req.session.user) {
        const taskTitle = req.body.title? req.body.title: "Not Mentioned";
        const taskDescription = req.body.description? req.body.description: "Not Mentioned" ;
        const task = new Task({
            title: taskTitle,
            description: taskDescription,
            userId: req.session.user._id,
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
    }else{
        res.redirect('/login');
    }
}

exports.deleteTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Task.findByIdAndRemove(taskId).then(() => {
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
    Task.deleteMany({userId: req.session.user._id})
        .then(() => {
            res.redirect('/');
        });
}