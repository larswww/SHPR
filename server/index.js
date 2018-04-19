const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: '/Users/mbp/Documents/Code/SHPR/server/.env'})
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const cors = require('cors')
const routes = require('./src/routes')
const seedDB = require('./src/lib/seedDB')
const app = express()
const validateError = require('./src/lib/validateError')

mongoose.connect(process.env.mongodb_connection_string)
app.use(cors())
app.use(helmet())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}))
app.use(morgan('tiny'))

seedDB.admin(process.env.admin_email, process.env.admin_password)

if (process.env.NODE_ENV !== 'production') {
  console.log('NODE_ENV !== production')
}
app.use('/', routes)

app.use(function (err, req, res, next) {
  validateError(err)
  console.error('index.js error:', err)
  res.status(err.statusCode).send({error: true, message: err.message})
})

process.on('unhandledRejection', function (e) {
  console.error('index.js unhandled rejection:', e)
})

app.listen(process.env.server_port, () => {
  console.log(`Magic happens on port ${process.env.server_port}`)
})

module.exports = app
