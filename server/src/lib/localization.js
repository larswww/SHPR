'use strict'

const localization = ['chiangmai']

module.exports = function (req, res, next) {

  res.locals.lang = req.headers.language || 'en'
  if (!req.headers.origin) {
    res.locals.city = 'shanghai'
    return next()
  }


  if (req.headers.origin.indexOf(process.env[`${process.env.NODE_ENV}base_url`]) === 0) {
    res.locals.city = 'shanghai'
    return next()
  }

  if (req.headers.origin.indexOf('.') && req.headers.origin.indexOf('http://') === 0) {

    try {
      const subdomain = req.headers.origin.split('.')[0].split('http://')[1]
      if (localization.indexOf(subdomain) > -1) {
        res.locals.city = subdomain
        console.log(res.locals.city)
        return next()
      }

    } catch (e) {
      console.error(e)
      return next({error: true, message: 'invalid subdomain'})
    }
  }

}