const express = require('express');
const app = express.Router();

const karyawanCtrl = require('../controller/karyawan');
const kategoriCtrl = require('../controller/kategori');
const barangCtrl = require('../controller/barang');
const authCtrl = require('../controller/auth');
const auth = require('../middleware/auth');


app.get('/', function (req, res) {
  res.send({ message: 'hello dari route v1' });
});

//login
app.post('/login', authCtrl.userLogin);
//register
app.post('/register', authCtrl.userRegister);

//karyawan
app.get('/karyawan', auth, karyawanCtrl.getAllKaryawan);
app.get('/karyawan/:id', auth, karyawanCtrl.getOneKaryawan);
app.post('/karyawan', auth, karyawanCtrl.addKaryawan);
app.put('/karyawan/:id', auth, karyawanCtrl.updateOneKaryawan);
app.delete('/karyawan/:id', auth,  karyawanCtrl.deleteOneKaryawan);

//kategori
app.get('/kategori',auth, kategoriCtrl.getAllKategori);
app.get('/kategori/:id', auth, kategoriCtrl.getOneKategori);
app.post('/kategori', auth,  kategoriCtrl.addKategori);
app.put('/kategori/:id', auth,  kategoriCtrl.updateOneKategori);
app.delete('/kategori/:id', auth,  kategoriCtrl.deleteOneKategori);

//barang
app.get('/barang',auth, barangCtrl.getAllBarang);
app.get('/barang/:id', auth, barangCtrl.getOneBarang);
app.post('/barang', auth,  barangCtrl.addBarang);
app.put('/barang/:id', auth,  barangCtrl.updateOneBarang);
app.delete('/barang/:id', auth,  barangCtrl.deleteOneBarang);

module.exports = app;
