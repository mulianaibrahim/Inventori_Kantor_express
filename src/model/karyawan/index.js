const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  namaKaryawan: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('karyawans', schema)