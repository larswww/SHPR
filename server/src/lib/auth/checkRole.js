"use strict";

const jwt = require('jsonwebtoken');
let decoded;

module.exports = function checkRole(roles){
    { return function(req, res, next) {
        // const token = req.headers.authorization;
        // try {
        //     decoded = jwt.verify(token, process.env.jwt_secret);
        // }catch(e) {
        //     return next(e);
        // }
        //
        // res.locals.email = decoded.email;
        // res.locals.role = decoded.role;

        for(let role of roles) {
            if (res.locals.role === role) {
                return next();
            }
        }
        return next({
            message: 'Forbidden. There was no valid role found for the given request.',
            statusCode: 403
        });
    }}
};