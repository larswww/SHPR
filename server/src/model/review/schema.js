'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  venue: {type: Schema.Types.ObjectId, ref: 'venue', required: true}, //todo make this combo unique



})