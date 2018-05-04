'use strict'
const seedDB = require('../../src/lib/seedDB')
const userFacade = require('../../src/model/user/facade')
const userController = require('../../src/model/user/controller')

module.exports = async function () {
  await seedUsers()
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

}

async function seedReviews () {

}


