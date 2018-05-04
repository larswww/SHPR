'use strict'
const Facade = require('../../lib/facade')
const Schema = require('./schema')
const userFacade = require('../user/facade')
const reviewFacade = require('../review/facade')

class VenueFacade extends Facade {

  async createVenue(formData) {
    let doc = this.create({name: formData.name,
      description: formData.desc,
     })

    doc.update( {$addToSet: {
      addresses: {$each: formData.addresses},
      tags: {$each: formData.appliedTags},
      menu: {$each: formData.menu}
    }})
    doc.save()
  }

  async getReviewedVenues() {
    const admins = await userFacade.getAdmins()
    const adminIds = admins.map(admin => admin._id)
    const adminReviews = await reviewFacade.find({user: {$in: adminIds}})
    const adminReviewIds = adminReviews.map(ar => ar.venue)
    return await this.find({_id: {$in: adminReviewIds}})
  }

}

module.exports = new VenueFacade(Schema)