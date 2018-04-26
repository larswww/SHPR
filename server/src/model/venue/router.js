'use strict'
const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');

router.route('/create')
.post(checkRole(['ADMIN']), (...args) => controller.create(...args))

router.route('/')
  .get((...args) => controller.get(...args))

module.exports = router