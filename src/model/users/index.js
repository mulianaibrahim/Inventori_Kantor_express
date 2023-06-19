const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  gender: String,
}, {
  collection: 'users'
});

module.exports = mongoose.model('User', schema);