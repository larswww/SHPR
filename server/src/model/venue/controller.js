'use strict'
const Controller = require('../../lib/controller')
const Facade = require ('./facade')

class VenueController extends Controller {

  async createVenue(req, res, next) {
    try {
      const venue = await this.facade.createVenue(req.body)
      return res.status(201).json({venue})
    } catch (e) {
      console.error('createVenue', e)
      return next(e)
      //return res.status(400).json({error: true, message: 'Could not create venue'})
    }
  }

  async get(req, res, next) {
    try {
      const venues = await this.facade.find({})
      return res.status(200).json({message: 'Get all venues', venues: venues})
    } catch (e) {
      console.error(e)
      return next(e)
     // return res.status(400).json({message: 'Could not get venues'})

    }
  }


  async getVenue(req, res, next) {

    try {
      const name = req.params.name
      const venue = await this.facade.findOne({name})
      if (!venue) console.error('handle venue doesnt exist')
      res.status(200).json(venue._doc)
    } catch (e) {
      next(e)
    }
  }

  async getReviewed(req, res, next) {
    try {
      const reviewed = await this.facade.getReviewedVenues()
      return res.status(200).json({venues: reviewed})
    } catch (e) {
      next(e)
    }
  }


}

module.exports = new VenueController(Facade)