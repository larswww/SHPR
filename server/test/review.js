'use strict'
process.env.NODE_ENV = 'test'
const mongoose = require('mongoose')
const Venue = require('../src/model/venue/schema')
const User = require('../src/model/user/schema')
const Review = require('../src/model/review/schema')

const venues = require('./data/venue')

//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
const chai = require('chai')
const chaiHttp = require('chai-http') //https://github.com/chaijs/chai-http
const server = require('../index')
const should = chai.should()

const reviews = require('./data/reviews')

const seedData = require('./lib/loadSampleData')


describe('Review', async function () {
  let userToken, adminToken

  before(async function() {
    await Venue.remove({})
    await Review.remove({})
    await User.remove({})
    const obj = await seedData()
    userToken = obj.userToken
    adminToken = obj.adminToken
  })

  it('should reject a review without all params', function (done) {
    chai.request(server)
      .post('/api/review')
      .set('authorization', adminToken)
      .send({name: false, reviewAspects: 'sdsdsd'})
      .end((err, res) => {
        res.should.have.status(500)
        done()
      })
  })

  it('should require login to POST review', function (done) {
    chai.request(server)
      .post('/api/review')
      .send(reviews[0])
      .end((err, res) => {
        res.should.have.status(401)
        done()
      })

  })

  it('should POST review by ADMIN', function (done) {
    chai.request(server)
      .post('/api/review')
      .set('authorization', adminToken)
      .send(reviews[0])
      .end((err, res) => {
        res.should.have.status(500)
        done()
      })

  })

  it('should POST review by USER', function (done) {
    chai.request(server)
      .post('/api/review')
      .set('authorization', userToken)
      .send(reviews[1])
      .end((err, res) => {
        res.should.have.status(500)
        done()
      })
  })



  // get all the venues
  // filter based on reviews


})