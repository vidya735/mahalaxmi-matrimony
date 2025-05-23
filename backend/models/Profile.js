// backend/models/Profile.js

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  dob: String,
  age: String,
  contact: String,
  caste: String,
  place: String,
  photo: String, // stores filename like 'abc.jpg'
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);
