'use strict'
const Controller = require('../../lib/controller')
const Facade = require ('./facade')

class VenueController extends Controller {

  async createVenue(req, res, next) {
    try {
      const venue = await this.facade.createVenue(req.body, res.locals.lang, res.locals.city)
      return res.status(201).json({venue})
    } catch (e) {
      console.error('createVenue', e)
      return next(e)
      //return res.status(400).json({error: true, message: 'Could not create venue'})
    }
  }

  async get(req, res, next) {
    try {
      const venues = await this.facade.find({lang: res.locals.lang, city: res.locals.city})
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
      const venue = await this.facade.findOne({$or: [{name}, {nameLc: req.params.name.toLowerCase()}], lang: res.locals.lang, city: res.locals.city})
      if (!venue) console.error('handle venue doesnt exist')
      res.status(200).json(venue._doc)
    } catch (e) {
      next(e)
    }
  }

  async masterReviewed(req, res, next) {
    try {
      const reviewed = await this.facade.getMasterReviewedVenues(res.locals.city, res.locals.lang)
      return res.status(200).json(reviewed)
    } catch (e) {
      next(e)
    }
  }

  //todo should
  async getReviewed(req, res, next) {
    req.query = {_id: {$in: res.locals.user.reviewedVenues}, city: res.locals.city, lang: res.locals.lang}
    return await this.find(req, res, next)
  }

  async getNotReviewed(req, res, next) {
    const venuesReviewed = await this.facade.find({_id: {$in: res.locals.user.reviewedVenues}, city: res.locals.city, lang: res.locals.lang})
    const venueNames = venuesReviewed.map(x => x.name)
    req.query = {name: {$nin: venueNames}, city: res.locals.city, lang: res.locals.lang}
    return await this.find(req, res, next)
    // const notReviewed = await this.find(req, res, next)
    // return res.status(200).json({notReviewed: notReviewed})
  }

  async photos(req, res, next) {
    const files = req.files.map(x => x.filename)
    await this.facade.addToSet({name: req.body.venueName, lang: res.locals.lang}, 'photos', files)
    return res.status(201).json({files})
  }

  async getPhotos(req, res, next) {
    try {
      const bothLangVenues = await this.facade.find({$or: [{name: req.params.venueName}, {nameLc: req.params.name.toLowerCase()}], city: res.locals.city})
      let photos = new Set()
      for (let venue of bothLangVenues) for (let photo of venue.photos) photos.add(photo)
      return res.status(200).json({photos: Array.from(photos)})
    } catch (e) {
      return next(e)

    }
  }

}

module.exports = new VenueController(Facade)