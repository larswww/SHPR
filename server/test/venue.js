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

chai.use(chaiHttp)

const seedData = require('./lib/loadSampleData')

describe('Venue', function () {
  let userToken, adminToken

  before(async function () {
    await Venue.remove({})
    await Review.remove({})
    await User.remove({})
    const obj = await seedData()
    userToken = obj.userToken
    adminToken = obj.adminToken
  })

  it('it should GET all the venues', (done) => {
    chai.request(server)
      .get('/api/venue')
      .set('origin', 'http://localhost:8080')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.venues.should.be.a('array')
        res.body.venues.length.should.be.eql(venues.seed.length)
        done()
      })
  })

  it('it should not POST a venue without name', done => {
    chai.request(server)
      .post('/api/venue/create')
      .set('authorization', 'Bearer ' + adminToken)
      .set('origin', 'http://localhost:8080')
      .send({city: 'shanghai', description: 'something'})
      .end((err, res) => {
        res.should.have.status(500)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.message.should.equal('Error during create.')
        done()
      })

  })

  it('should not let a USER role POST a venue', function (done) {
    chai.request(server)
      .post('/api/venue/create')
      .set('authorization', 'Bearer ' + userToken)
      .set('origin', 'http://localhost:8080')
      .send({})
      .end(function (err, res) {
        res.should.have.status(403)
        res.body.should.have.property('error')
        res.body.message.should.equal('Forbidden. There was no valid role found for the given request.')
        done()
      })
  })

  it('should be possible to POST venues', function (done) {
    let venue = venues.extra[0]
    chai.request(server)
      .post('/api/venue/create')
      .set('authorization', 'Bearer ' + adminToken)
      .send(venue)
      .end(function (err, res) {
        done()

      })
  })

  it('should return an array of venues with ADMIN created reviews', function (done) {
    chai.request(server)
      .get('/api/venue/masterReviews')
      .set('origin', 'http://localhost:8080')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('venues')
        res.body.venues.length.should.equal(2)
        done()
      })

  })

  //todo this tests are a bit week and doesnt assert correct reviewed venues are returned
  it('should return an array of venues not reviewed by logged in user', function (done) {
    chai.request(server)
      .get('/api/venue/notReviewed')
      .set('authorization', 'Bearer ' + userToken)
      .set('origin', 'http://localhost:8080')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })

  })

  it('should return an array of venues reviewed by logged in user', function (done) {
    chai.request(server)
      .get('/api/venue/reviewed')
      .set('authorization', 'Bearer ' + userToken)
      .set('origin', 'http://localhost:8080')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })

  })

})

