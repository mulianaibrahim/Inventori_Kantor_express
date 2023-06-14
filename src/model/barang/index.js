const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nama: String,
    nim: Number,
    kelas: String,
    jenisKelamin: String,
});

module.exports = mongoose.model('barangs', schema)