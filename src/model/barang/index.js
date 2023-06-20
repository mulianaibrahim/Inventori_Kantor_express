const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  kodeBarang: String,
  namaBarang: String,
  kategori: String,
  tanggalPerolehan: Date,
  hargaPerolehan: Number,
  masaGuna: String,
  kondisi: String,
  lokasi: String,
  penggunaSaatIni: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('barangs', schema)