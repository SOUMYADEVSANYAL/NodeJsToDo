exports.get404 = (req, res, next) =>{
    res.render('404',{
        isAuth: req.session.isLoggedIn,
        path: '/404'
    });
}