'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  venue: {type: Schema.Types.ObjectId, ref: 'venue', required: true}, //todo make this combo unique
  venueName: String,
  selectedPizza: 'String', //todo what if venue names arent unique?
  aspects: [{name: String, heading: String, text: String, rating: Number}]
})


reviewSchema.index({user: 1, venue: 1}, {unique: true})

module.exports = mongoose.model('review', reviewSchema, 'review')