const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  namaKaryawan: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Karyawan', schema)