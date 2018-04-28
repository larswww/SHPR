'use strict'
process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const User = require('../src/model/user/schema');
const seedDb = require('../src/lib/seedDB')
const authorize = require('../src/lib/auth/Auth')

//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
const chai = require('chai');
const chaiHttp = require('chai-http'); //https://github.com/chaijs/chai-http
const server = require('../index');
const should = chai.should();
const assert = chai.assert
const expect = chai.expect

chai.use(chaiHttp);

describe('User', () => {
  before(done => {
    User.remove({}, err => {
      done()
    })
  })

  describe('api/user USER role', () => {
    let userToken = ''
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
          userToken = res.body.token
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
          userToken = res.body.token
          done()
        })
    })


    it('token decodes correctly', done => {
      let req = {}
      req.headers = {}
      req.headers.authorization = userToken
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
        .set('authorization', userToken)
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

  describe('api/user ADMIN role', () => {
    let adminToken = false

    it('should be possible to create admin account', async function() {
      const admin = await seedDb.admin(process.env.admin_email, process.env.admin_password)
      assert.isOk(admin, 'creating admin account on empty db isOk')
    })


  })


})


