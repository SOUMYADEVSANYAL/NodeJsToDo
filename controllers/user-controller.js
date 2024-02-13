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