const mongoose = require("mongoose");

const Match = new mongoose.Schema({
    id_user:  {
      type: String,
      required: true
    },
    id_sport: {
      type: String,
      required: true
    },
    match_player: {
      type: Number
    },
    match_description: {
      type: String,
    },
    match_location_lat: {
      type: String,
      required: true
    },
    match_location_lang: {
      type: String,
      required: true
    },
    match_location_city: {
      type: String,
      required: true
    },
    match_location_district: {
      type: String,
      required: true
    },
    match_location_address: {
      type: String,
      required: true
    },
    match_date: {
      type: Date,
      required: true
    },
    match_cost: String
})

module.exports = mongoose.model('match', Match)
