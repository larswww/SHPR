'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const venueSchema = new Schema({
  city: {type: String, default: 'shanghai'},
  description: String,
  name: String,
  addresses: {type: Array, default: []},
  appliedTags: {type: Array, default: []},
  menu: {type: Array, default: []},
})

module.exports = mongoose.model('venue', venueSchema, 'venue')
