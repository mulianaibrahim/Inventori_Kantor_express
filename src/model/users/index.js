const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

module.exports = mongoose.model('users', schema);