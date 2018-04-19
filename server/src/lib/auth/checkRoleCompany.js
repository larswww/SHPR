"use strict";

const companyFacade = require('../../model/company/facade');
const userFacade = require('../../model/user/facade');
const jwt = require('jsonwebtoken');
let decoded;

module.exports = async function apiCompany(req, res, next){
    const companyId = req.param('id');
    const token = req.headers.authorization;
    let company;
    let user;

    try {
        decoded = jwt.verify(token, process.env.jwt_secret);

        res.locals.email = decoded.email;
        res.locals.role = decoded.role;

        //If user is ADMIN continue
        if (decoded.role === 'ADMIN'){
            return next();
        }

        //Get the user that is logged in
        user = await userFacade.findOne({ email: decoded.email });
        if (!user) return next({message: 'Invalid token', statusCode: 401 });
    }catch (e){
        return next({
            message: e.message,
            statusCode: 500
        });
    }

     return next({
            message: 'Forbidden. There was no valid role found for the given request.',
            statusCode: 403
        });
};