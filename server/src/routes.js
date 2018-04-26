const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const venue = require('./model/venue/router')
// const company = require('./model/company/router');
// const product = require('./model/product/router');
// const category = require('./model/category/router');
// const material = require('./model/material/router');
// const materialRating = require('./model/materialRating/router');
// const thread = require('./model/thread/router');
// const notifications = require('./model/notifications/router');

const authorize = require('./lib/auth/Auth');
const openRoute = require('./lib/auth/openRoutes')

router.route('/api').get((req, res) => {
  res.json({message: 'Welcome to backend API!'})
});

router.route('*').all(function (req, res, next) {
  console.log(req.url)
  console.log(openRoute(req.url))
  if (openRoute(req.url)) return next();
  authorize(req, res, next);
});

router.use('/api/user', user);
router.use('/api/venue', venue)
// router.use('/api/company', company);
// router.use('/api/category', category);
// router.use('/api/product/material', material);
// router.use('/api/product/material',  materialRating);
// router.use('/api/', product);
// router.use('/api/forum', thread);
// router.use('/api/notifications', notifications);

module.exports = router;
