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

  async masterReviewed(req, res, next) {
    try {
      const reviewed = await this.facade.getMasterReviewedVenues()
      return res.status(200).json(reviewed)
    } catch (e) {
      next(e)
    }
  }

  async getReviewed(req, res, next) {
    req.query = {_id: {$in: res.locals.user.reviewedVenues}}
    return await this.find(req, res, next)
  }

  async getNotReviewed(req, res, next) {
    req.query = {_id: {$nin: res.locals.user.reviewedVenues}}
    return await this.find(req, res, next)
    // const notReviewed = await this.find(req, res, next)
    // return res.status(200).json({notReviewed: notReviewed})
  }


}

module.exports = new VenueController(Facade)