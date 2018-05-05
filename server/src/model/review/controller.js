'use strict'
const Controller = require('../../lib/controller')
const Facade = require ('./facade')
const userFacade = require('../user/facade')

class ReviewController extends Controller {

  async saveReview(req, res, next) {
    try {
      if (!req.body.reviewAspects || !req.body.venueName) return next({error: true, message: 'missing review params'})
      const review = await this.facade.saveReview(res.locals.user._id, req.body)
      review._doc.aspects = req.body.reviewAspects //haxx since the update returns an empty array
      await userFacade.addReview(res.locals.user, review)
      return res.status(201).json(review._doc) //todo render the edit page
    } catch (e) {
      return next(e)
    }
  }
}

module.exports = new ReviewController(Facade)