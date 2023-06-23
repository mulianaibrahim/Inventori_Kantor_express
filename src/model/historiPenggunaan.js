const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  namaBarang: {
    type: String,
    required: true,
  },
  pengguna: {
    type: String,
    required: true
  },
  tanggalMulaiPenggunaan: {
    type: Date,
    required: true,
  },
  tanggalSelesaiPenggunaan: {
    type: Date,
    required: true,
  },
  kondisiAwal: {
    type: String,
  },
  kondisiPengembalian: {
    type: String,
    required: true,
  },
  createdAt: Date,
});

module.exports = mongoose.model('HistoriPenggunaan', schema)