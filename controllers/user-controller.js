const User = require('../models/user-schema');
exports.getSignIn = (req, res, next)=>{
    res.render('login',{
        isAuth: false,
        path:'/login'
    });
};

exports.getSignUp = (req, res, next)=>{
    res.render('signup',{
        isAuth: req.session.isLoggedIn,
        path:'/signup'
    });
};

exports.postSignIn = (req, res, next)=>{
    User.findById('65cdb4c7a2f75f0d7ccc9f96')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        if(user){
            res.redirect('/');
        }
        res.redirect('/login');
    })
    .catch(err => console.log(err));
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
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
      });
};

exports.postLogout = (req, res, next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
};