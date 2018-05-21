'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const venueSchema = new Schema({
  lang: String,
  city: String,
  description: String,
  name: {type: String, required: true},
  addresses: {type: Array, default: []},
  appliedTags: {type: Array, default: []},
  menu: Object,
  photos: [String]
})

venueSchema.index({name: 1, lang: 1}, {unique: true})

module.exports = mongoose.model('venue', venueSchema, 'venue')
