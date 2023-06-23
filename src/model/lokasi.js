const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  namaLokasi: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Lokasi', schema)