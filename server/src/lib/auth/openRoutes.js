'use strict'
const openRoutes = ['/api/user/login', '/api/user/signup', '/api/venue/']

module.exports = function (route) {
  return openRoutes.indexOf(route) > -1
}