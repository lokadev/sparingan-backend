const mongoose = require("mongoose")

const Sport = new mongoose.Schema({
  sport_name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('sport',Sport)