'use strict'
const Facade = require('../../lib/facade')
const Schema = require('./schema')
const reviewFacade = require('../review/facade')
const userFacade = require('../user/facade')
const mongoose = require('mongoose')

class VenueFacade extends Facade {

  async createVenue (formData, lang, city) {
    let doc = await this.create({
      name: formData.name,
      nameLc: formData.name.toLowerCase(),
      description: formData.desc,
      lang, city
    })

    const id = doc._id
    await this.addToSet(id, 'addresses', formData.addresses)
    await this.addToSet(id, 'appliedTags', formData.appliedTags)
    await this.addToSet(id, 'menu', formData.menu.items)
  }

  async getMasterReviewedVenues (city, lang) {
    const admins = await userFacade.getAdmins()
    const adminIds = admins.map(admin => admin._id)
    const adminReviews = await mongoose.model('review').find({user: {$in: adminIds}})
    // const adminReviews = await reviewFacade.find({user: {$in: adminIds}})
    const adminReviewIds = adminReviews.map(ar => ar.venue)
    const venues = await this.find({_id: {$in: adminReviewIds}, city, lang})

    //todo this is garbage
    const res = []
    for (let i = 0; i < venues.length; i++) {
      venues[i]._doc.review = adminReviews[i]._doc
      res.push(venues[i]._doc)
    }

    return res
  }

}

module.exports = new VenueFacade(Schema)