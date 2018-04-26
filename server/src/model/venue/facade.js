'use strict'
const Facade = require('../../lib/facade')
const Schema = require('./schema')

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

}

module.exports = new VenueFacade(Schema)