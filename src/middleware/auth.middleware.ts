/**
 * Auth middleware
 * @param roles
 */
export const authMiddleware = (...roles) => (req, res, next) => {
    // const userId = req.body.userId;
    if (req.session.user) {
        //console.log(`current user = ${req.session.user}`);
        if (roles.includes(req.session.user.role.role)) {
            next();
        } else {
            // 403 Forbidden - member doesn't have access
            res.status(403);
            res.send('Permission Denied');
        }
    } else {
        // 401 Unauthorized - non-member and doesn't have access
        res.sendStatus(401);
    }
};