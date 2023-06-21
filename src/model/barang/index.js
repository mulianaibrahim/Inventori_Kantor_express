const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  kodeBarang: String,
  namaBarang: {
    type: String,
    required: true,
  },
  kategori: {
    type: Schema.Types.ObjectId,
    ref: 'Kategori',
    required: true
  },
  tanggalPerolehan: {
    type: Date,
    required: true,
  },
  hargaPerolehan: {
    type: Number,
    required: true,
  },
  masaGuna: {
    type: String,
    required: true,
  },
  kondisi: {
    type: String,
    required: true,
  },
  lokasi: {
    type: Schema.Types.ObjectId,
    ref: 'Lokasi',
    required: true
  },
  penggunaSaatIni: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Barang', schema)