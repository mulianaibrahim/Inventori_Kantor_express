const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    kode: String, 
    nama: String, 
    sks: Number, 
    kelas: String,
});

module.exports = mongoose.model('mataKuliahs', schema)