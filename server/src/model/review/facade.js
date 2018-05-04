'use strict'
const Facade = require('../../lib/facade')
const Schema = require('./schema')
const venueFacade = require('../venue/facade')


class ReviewFacade extends Facade {

  async saveReview(user, review) {
    const venue = await venueFacade.findOne({name: review.name})
    if (!venue) throw new Error('No such venue')
    review.venue = venue._id
    review.venueName = venue.name
    review.user = user
    let newReview = await this.create(review)
    await this.updateReview(newReview, review.reviewAspects)
    return newReview
  }

  async updateReview(review, aspects) {
    await review.update({$addToSet: {aspects: aspects}})
    await review.save()
  }




}

module.exports = new ReviewFacade(Schema)