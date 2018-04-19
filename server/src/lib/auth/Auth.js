const userFacade = require('../../model/user/facade');
const jwt = require('jsonwebtoken');

module.exports = async function authorize(req, res, next) {
    const authParam = req.headers.authorization;

    if (authParam === undefined) {
        return next({message: 'There was no token in the header', statusCode: 401 });
    } else if (authParam.indexOf('Bearer ') !== 0) {
        return next({message: 'Not a bearer token', statusCode: 401})
    }

    try {
      const token = authParam.split('Bearer ')[1]
      const decoded = await jwt.verify(token, process.env.jwt_secret);

        const mongoGetUserQuery = {
            $and: [
                { 'email': decoded.email },
                { 'role': decoded.role }
            ]
        };

        const user = await userFacade.findOne(mongoGetUserQuery);
        if (!user) return next({ error: true, message: 'Invalid token', statusCode: 401});
        res.locals.email = decoded.email;
        res.locals.role = decoded.role;
        res.locals.user = user;

        return next();
    } catch(e) {
        return next(e);
    }
};