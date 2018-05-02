'use strict'
const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');

router.route('/')
  .post(checkRole(['ADMIN', 'USER']), (...args) => controller.saveReview(...args));


module.exports = router;