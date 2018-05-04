'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const venueSchema = new Schema({
  city: String,
  description: String,
  name: {type: String, required: true, unique: true},
  addresses: {type: Array, default: []},
  appliedTags: {type: Array, default: []},
  menu: Object,
})

module.exports = mongoose.model('venue', venueSchema, 'venue')
