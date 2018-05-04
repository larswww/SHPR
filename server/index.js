require('dotenv').config({path: '/Users/mbp/Documents/Code/SHPR/server/.env'})
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const cors = require('cors')
const routes = require('./src/routes')
const seedDB = require('./src/lib/seedDB')
const app = express()
const validateError = require('./src/lib/validateError')

const dbOptions = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

console.log(`${process.env.NODE_ENV}`)

mongoose.connect(process.env[`${process.env.NODE_ENV}db`], dbOptions)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
if (process.env.NODE_ENV !== 'production') mongoose.set('debug', true);
seedDB.admin(process.env.admin_email, process.env.admin_password)

app.use(cors())
app.use(helmet())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}))

if (process.env.NODE_ENV !== 'test') app.use(morgan('combined'))

app.use('/', routes)

app.use(function (err, req, res, next) {
  console.error('index.js error:', err)
  validateError(err)
  res.status(err.statusCode).send({error: true, message: err.message})
})

process.on('unhandledRejection', function (e) {
  console.error('index.js unhandled rejection:', e)
})

app.listen(process.env.server_port, () => {
  console.log(`Magic happens on port ${process.env.server_port}`)
})

module.exports = app
