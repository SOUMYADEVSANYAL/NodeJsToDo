const User = require('../models/user-schema');
exports.getSignIn = (req, res, next)=>{
    res.render('login',{
        path:'/login'
    });
};

exports.getSignUp = (req, res, next)=>{
    res.render('signup',{
        path:'/signup'
    });
};

exports.postSignIn = (req, res, next)=>{
    req.session.isLoggedIn = true;
    res.redirect('/');
};

exports.postSignUp = (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const user = new User({
        name: name,
        email: email
    });
    user.save()
    .then(result => {
        res.redirect('/signup');
    })
    .catch(err => {
        console.log(err);
      });
};