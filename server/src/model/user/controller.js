const jwt = require('jsonwebtoken')
const Controller = require('../../lib/controller')
const userFacade = require('./facade')
const reviewFacade = require('../review/facade')

class UserController extends Controller {
  async login (req, res, next) {
    const {email, password} = req.body // todo presuming email and pw are sent on body params from loginform
    if (!email || !password) return next({error: true, message: 'username or password missing', statusCode: 400})

    try {
      const doc = await userFacade.findOneLogin({email})
      await doc.comparePassword(password)
      const role = doc.role

      const token = jwt.sign(JSON.stringify({role, userId: doc._id, email}), process.env.jwt_secret)
      return res.json({token, error: false})
    } catch (e) {
      console.error('user/controller/login')
      return next(e)
    }
  }

  async signup (req, res, next) {
    const {
      email, password
    } = req.body
    const role = 'USER'
    try {
      if (!email || !password) return res.status(400).json({error: true})
      const userDocument = await userFacade.createUser({email, password, role})
      if (!userDocument) return res.status(400)
      return res.status(201).json({
        error: false,
        token: jwt.sign({email, role, userId: userDocument._id}, process.env.jwt_secret)
      })
    } catch (e) {
      console.error('user/controller/signup')
      if (e.code === 11000) return res.status(409).json({message: "User already exists", statusCode: 409});
      return res.status(500).json({message: "createUser failed", statusCode: 500})
    }
  }

  async getReviews(req, res, next) {
    try {
      const reviews = await reviewFacade.find({user: res.locals.user._id})
      res.status(200).json(reviews)
    } catch (e) {
      console.error('user/controller/getReviews')
      return next(e)
    }

  }
}

module.exports = new UserController(userFacade)
