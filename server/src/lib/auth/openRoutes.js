'use strict'
const openRoutes = {}
openRoutes['/api/user/login'] = ['GET', 'POST']
openRoutes['/api/user/signup'] = ['POST']
openRoutes['/api/venue/masterReviews'] = ['GET']
openRoutes['/api/venue'] = ['GET']


//this is for routes that has a :param in the url
const paramRoutes = [
  {
    route: '/api/venue/name',
    method: 'GET'
  }
]

module.exports = function (route, method) {
  for (let pr of paramRoutes) if (route.indexOf(pr.route) === 0 && pr.method === method) return true
  return (openRoutes[route] && openRoutes[route].indexOf(method) > -1)
}