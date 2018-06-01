'use strict'
const seedDB = require('../../src/lib/seedDB')
const userFacade = require('../../src/model/user/facade')
const userController = require('../../src/model/user/controller')
const venueFacade = require('../../src/model/venue/facade')
const venueController = require('../../src/model/venue/controller')
const reviewFacade = require('../../src/model/review/facade')
const reviewController = require('../../src/model/review/controller')

const venues = require('../data/venue')
const reviews = require('../data/reviews')

module.exports = async function () {
  await seedUsers()
  await seedVenues()
  await seedReviews()
  await seedPhotos()

  let userToken = ''
  await userController.login({
    body: {
      email: 'testOne@gmail.com',
      password: 'password'
    }
  }, {
    json: function (res) {
      userToken = res.token
    }
  })

  let adminToken = ''
  await userController.login({
    body: {
      email: process.env.admin_email,
      password: process.env.admin_password
    }
  }, {
    json: function (res) {
      adminToken = res.token
    }
  })

  return {userToken, adminToken}
}

async function seedUsers () {
  await seedDB.admin(process.env.admin_email, process.env.admin_password)
  return await userFacade.createUser({email: 'testOne@gmail.com', password: 'password', role: 'USER'})
}

async function seedVenues () {
  for (let venue of venues.seed) await venueFacade.createVenue(venue, venue.lang, venue.city)
}

async function seedReviews () {
  const admin = await userFacade.findOne({role: 'ADMIN'})
  const user = await userFacade.findOne({role: 'USER'})

  for (let i = 0; i < reviews.seed.length - 1; i++) {
    let cb = standardCallback()
    if (i < 2) cb.locals.user._id = admin._id //admin created reviews
    else cb.locals.user._id = user._id //user created reviews
    await reviewController.saveReview({body: reviews.seed[i]}, cb, nextError)
  }
}

async function seedPhotos () {
  const files = []
  for (let i = 1; i < 6; i++) files.push({filename:`pizza${i}.jpeg`})
  await venueController.photos({files, body: {venueName: 'Bella Napoli'}}, standardCallback(), nextError)

}

function standardCallback () {
  return {
    status: function (httpcode) {
      return {
        json: function (res) {

        }
      }
    },
    locals: {
      user: {
        id: ''
      },
      city: 'shanghai',
      lang: 'en'
    }
  }
}

function nextError(e) {
  console.error('loadData passed next:', e)
}

