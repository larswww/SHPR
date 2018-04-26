'use strict'
const Controller = require('../../lib/controller')
const Facade = require ('./facade')

class VenueController extends Controller {

  async createVenue(req, res, next) {
    try {
      await this.facade.createVenue(req.body)
      return res.status(201)
    } catch (e) {
      console.error('createVenue', e)
      return res.status(401)
    }
  }

  async get(req, res, next) {
    try {
      const venues = await this.facade.find({})
      return res.status(200).json({message: 'Get all venues', venues: venues})
    } catch (e) {
      console.error(e)
      return res.status(400).json({message: 'Could not get venues'})

    }
  }
}

module.exports = new VenueController(Facade)