'use strict'
const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');

router.route('/login')
  .post((...args) => controller.login(...args))

router.route('/signup')
  .post((...args) => controller.signup(...args))

router.route('/reviews')
  .get(checkRole(['ADMIN', 'USER']), (...args) => controller.getReviews(...args))

module.exports = router;