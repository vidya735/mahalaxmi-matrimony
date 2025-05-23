// backend/models/Profile.js

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: String,
  location: String,
  caste: String,
  occupation: String,
  income: String,
  photo: String, // stores filename like 'abc.jpg'
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);
