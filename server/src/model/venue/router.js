'use strict'
const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');

router.route('/create')
.post(checkRole(['ADMIN']), (...args) => controller.create(...args))

router.route('/')
  .get((...args) => controller.get(...args))

router.route('/:name')
  .get((...args) => controller.getVenue(...args))

module.exports = router