const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  namaKategori: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('kategoris', schema)