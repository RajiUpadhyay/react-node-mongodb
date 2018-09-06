exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ failure: { message: 'Unauthorized user!' } });
    }
};