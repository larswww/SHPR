'use strict'
const Facade = require('../../lib/facade')
const Schema = require('./schema')
const reviewFacade = require('../review/facade')
const userFacade = require('../user/facade')
const mongoose = require('mongoose')

class VenueFacade extends Facade {

  async createVenue(formData) {
    let doc = await this.create({name: formData.name,
      description: formData.desc,
     })

    doc.update( {$addToSet: {
      addresses: {$each: formData.addresses},
      tags: {$each: formData.appliedTags},
      menu: {$each: formData.menu}
    }})
    doc.save()
  }

  async getMasterReviewedVenues() {
    const admins = await userFacade.getAdmins()
    const adminIds = admins.map(admin => admin._id)
    const adminReviews = await mongoose.model('review').find({user: {$in: adminIds}})
    // const adminReviews = await reviewFacade.find({user: {$in: adminIds}})

    const adminReviewIds = adminReviews.map(ar => ar.venue)
    return await this.find({_id: {$in: adminReviewIds}})
  }

}

module.exports = new VenueFacade(Schema)