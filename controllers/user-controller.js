const bcrypt = require('bcryptjs');
const User = require('../models/user-schema');
exports.getSignIn = (req, res, next) => {
    res.render('login', {
        isAuth: false,
        path: '/login'
    });
};

exports.getSignUp = (req, res, next) => {
    res.render('signup', {
        isAuth: req.session.isLoggedIn,
        path: '/signup'
    });
};

exports.postSignIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                console.log('User not found');
                res.redirect('/login');
            } else {
                bcrypt
                    .compare(password, user.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            console.log('Logged in Successfully');
                            res.redirect('/');
                        } else {
                            console.log('Password does not match');
                            res.redirect('/login');
                        }
                    })
            }
        }).catch(err => {
            console.log(err);
            console.log('Something went wrong');
            res.redirect('/error');
        });
};

exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                res.redirect('/signup');
            } else {
                bcrypt
                    .hash(password, 12)
                    .then((hashedPassword) => {
                        const user = new User({
                            name: name,
                            email: email,
                            password: hashedPassword
                        });
                        user.save();
                    })
                    .then(() => {
                        res.redirect('/login');
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};