'use strict'
const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const checkRole = require('../../lib/auth/checkRole');

router.route('/create')
.post(checkRole(['ADMIN']), (...args) => controller.create(...args))

router.route('/')
  .get((...args) => controller.get(...args))

router.route('/masterReviews')
  .get((...args) => controller.masterReviewed(...args))

router.route('/name/:name')
  .get((...args) => controller.getVenue(...args))

router.route('/reviewed')
  .get((...args) => controller.getReviewed(...args))

router.route('/notReviewed')
  .get((...args) => controller.getNotReviewed(...args))

module.exports = router