const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  body: String,
});

module.exports = mongoose.model('posts', schema)