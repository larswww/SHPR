'use strict'
const seedDB = require('../../src/lib/seedDB')
const userFacade = require('../../src/model/user/facade')
const userController = require('../../src/model/user/controller')
const venueFacade = require('../../src/model/venue/facade')
const reviewFacade = require('../../src/model/review/facade')

const venues = require('../data/venue')
const reviews = require('../data/reviews')

module.exports = async function () {
  await seedUsers()
  await seedVenues()
  await seedReviews()

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
  for (let venue of venues.seed) await venueFacade.createVenue(venue)
}

async function seedReviews () {
  const admin = await userFacade.findOne({role: 'ADMIN'})
  const user = await userFacade.findOne({role: 'USER'})

  for (let i = 0; i < reviews.seed.length -1; i++) {
    if (i < 2) { //admin created reviews
      await reviewFacade.saveReview(admin._id, reviews.seed[i])

    } else { // user created
      await reviewFacade.saveReview(user._id, reviews.seed[i])
    }
  }
}


