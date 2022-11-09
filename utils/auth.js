const withAuth = (req, res, next) => {
    if(!req.session_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.export = withAuth;