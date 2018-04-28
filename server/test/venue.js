'use strict'
process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');
let Venue = require('../src/model/venue/schema');

//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
let chai = require('chai');
let chaiHttp = require('chai-http'); //https://github.com/chaijs/chai-http
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

describe('/api/venue/create', () => {
  it('it should not POST a venue without name', done => {
    chai.request(server)
      .post('api/venue/create')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhpQGxhcnN3Lm5ldCIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6IjVhYzk5ODVmZDRjNmZmMzhhNTNjZGI4NiJ9.BId_QYvnbqtni-ST0yZdMmNQBK1FBdfTxhozRRLmTdo')
      .send({city: 'shanghai', description: 'something'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('pages');
        res.body.errors.pages.should.have.property('kind').eql('required');
        done();
      })


  })
})