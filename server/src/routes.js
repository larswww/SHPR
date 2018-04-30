const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const venue = require('./model/venue/router')
const authorize = require('./lib/auth/Auth');
const openRoute = require('./lib/auth/openRoutes')

router.route('/api').get((req, res) => {
  res.json({message: 'Welcome to backend API!'})
});

router.route('*').all(function (req, res, next) {
  if (openRoute(req.url, req.method)) return next();
  authorize(req, res, next);
});

router.use('/api/user', user);
router.use('/api/venue', venue)

module.exports = router;
