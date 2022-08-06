const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  isProfessional: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('user',User)