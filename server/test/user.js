'use strict'
process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const User = require('../src/model/user/schema');
const Venue = require('../src/model/venue/schema')
const Review = require('../src/model/review/schema')


const seedDb = require('../src/lib/seedDB')
const authorize = require('../src/lib/auth/Auth')
const seedData = require('./lib/loadSampleData')

//https://mochajs.org/#getting-started
//http://www.chaijs.com/api/assert/
//https://github.com/chaijs/chai-http
//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
const chai = require('chai');
const chaiHttp = require('chai-http'); //https://github.com/chaijs/chai-http
process.env.NODE_ENV = 'test'
const server = require('../index');
const should = chai.should();
const assert = chai.assert
const expect = chai.expect

chai.use(chaiHttp);

describe('User', () => {

  let userToken, adminToken

  before(async function() {
    await Venue.remove({})
    await Review.remove({})
    await User.remove({})

    const obj = await seedData()
    userToken = obj.userToken
    adminToken = obj.adminToken
  })

  describe('api/user USER role', () => {
    let createdUserToken = ''
    const email = 'test@gmail.com'
    const password = 'password'

    it('Signup works returning token', done => {
      chai.request(server)
        .post('/api/user/signup')
        .send({email, password})
        .end((err, res) => {
          res.should.have.status(201)
          res.body.token.should.be.a('string')
          res.body.error.should.equal(false)
          createdUserToken = res.body.token
          done()
        })
    })

    it('can login returning token', done => {
      chai.request(server)
        .post('/api/user/login')
        .send({email, password})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.token.should.be.a('string')
          res.body.error.should.equal(false)
          createdUserToken = res.body.token
          done()
        })
    })


    it('token decodes correctly', done => {
      let req = {}
      req.headers = {}
      req.headers.authorization = createdUserToken
      let res = {}
      res.locals = {}
      authorize(req, res, (authRes) => {
        res.locals.role.should.equal("USER")
        res.locals.email.should.equal(email)
        should.exist(res.locals.user)
        assert.strictEqual(authRes, undefined, 'no error is returned from authorize')
        done()
      })
    })


    it('ADMIN route as USER is not possible', function (done) {
      chai.request(server)
        .post('/api/venue/create')
        .set('authorization', createdUserToken)
        .send({})
        .end(function (err, res) {
          expect(res).to.have.status(403)
          should.exist(res.body)
          res.body.message.should.equal('Forbidden. There was no valid role found for the given request.')
          res.body.error.should.equal(true)
          done()
        })
    })
  })

  // describe('api/user ADMIN role', () => {
  //   it('should be possible to create admin account', async function() {
  //     const admin = await seedDb.admin(process.env.admin_email, process.env.admin_password)
  //     assert.isOk(admin, 'creating admin account on empty db isOk')
  //   })
  //
  //
  // })


})


