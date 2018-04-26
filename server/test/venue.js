'use strict'
process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');
let Venue = require('../src/model/venue/schema');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Venue', () => {
  beforeEach(done => {
    Venue.remove({}, err => {
      done()
    })
  })
})

describe('/api/venue GET', () => {
  it('it should GET all the venues', (done) => {
    chai.request(server)
      .get('/api/venue')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.venues.should.be.a('array');
        res.body.venues.length.should.be.eql(0);
        done();
      });
  });
});