'use strict'
process.env.NODE_ENV = 'test'
const mongoose = require('mongoose')
const Venue = require('../src/model/venue/schema')
const venues = require('./data/venue')

//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
const chai = require('chai')
const chaiHttp = require('chai-http') //https://github.com/chaijs/chai-http
const server = require('../index')
const should = chai.should()

chai.use(chaiHttp)

describe('Venue', () => {
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJ1c2VySWQiOiI1YWU0M2MxMDRiYjY0YWMyNGZlOWVmMzEiLCJpYXQiOjE1MjQ5MDcwMjR9.OVK_oSCcCi39DaDG1JS562k2kKOEYHo1-3m2WyjuawQ'
  const adminToken = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhpQGxhcnN3Lm5ldCIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6IjVhYzk5ODVmZDRjNmZmMzhhNTNjZGI4NiJ9.BId_QYvnbqtni-ST0yZdMmNQBK1FBdfTxhozRRLmTdo'

  before(done => {
    Venue.remove({}, err => {
      done()
    })
  })

  it('it should GET all the venues', (done) => {
    chai.request(server)
      .get('/api/venue')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.venues.should.be.a('array')
        res.body.venues.length.should.be.eql(0)
        done()
      })
  })

  it('it should not POST a venue without name', done => {
    chai.request(server)
      .post('/api/venue/create')
      .set('authorization', adminToken)
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
      .set('authorization', userToken)
      .send({})
      .end(function (err, res) {
        res.should.have.status(403)
        res.body.should.have.property('error')
        res.body.message.should.equal('Forbidden. There was no valid role found for the given request.')
        done()
      })
  })

  it('should be possible to POST venues', function (done) {
    let venue = venues[0]
      chai.request(server)
        .post('/api/venue/create')
        .set('authorization', adminToken)
        .send(venue)
        .end(function (err, res) {
          done()

        })
  })
})

