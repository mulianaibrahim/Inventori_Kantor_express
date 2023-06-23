const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  namaBarang: {
    type: Schema.Types.ObjectId,
    ref: 'Barang',
    required: true,
  },
  pengguna: {
    type: Schema.Types.ObjectId,
    ref: 'Karyawan',
    required: true
  },
  tanggalMulaiPenggunaan: {
    type: Date,
    required: true,
  },
  kondisiAwal: {
    type: String,
  },
  statusPenggunaan: {
    type: String,
    required: true,
  },
  createdAt: Date,
});

module.exports = mongoose.model('Penggunaan', schema)