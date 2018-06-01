'use strict'
const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.env.upload_path}/`)
  },
  filename: function (req, file, cb) {
    let name = `${Date.now()}-${file.originalname}`
    cb(null, name)
  }
})
const upload = multer({storage})
const checkRole = require('../../lib/auth/checkRole');

router.route('/create')
.post(checkRole(['ADMIN']), (...args) => controller.createVenue(...args))

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

router.route('/photos')
  .post(checkRole(['ADMIN', 'USER']), upload.array('photos'), (...args) => controller.photos(...args))
  .get((...args) => controller.getPhotos(...args))

module.exports = router