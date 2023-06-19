const express = require('express');
const app = express.Router();

const karyawanCtrl = require('../controller/karyawan');
const kategoriCtrl = require('../controller/kategori');
const postCtrl = require('../controller/post');
const auth = require('../middleware/auth');


app.get('/', function (req, res) {
  res.send({ message: 'hello dari route v1' });
});



//kategori
app.get('/kategori', kategoriCtrl.getAllKategori);
app.get('/kategori/:id', kategoriCtrl.getOneKategori);
app.post('/kategori', kategoriCtrl.addKategori);
app.put('/kategori/:id', kategoriCtrl.updateOneKategori);
app.delete('/kategori/:id', kategoriCtrl.deleteOneKategori);

//post
app.get('/posts', postCtrl.getPosts);
app.get('/posts/:id', postCtrl.getOnePost);
app.post('/posts', postCtrl.addPosts);
app.put('/posts/:id', postCtrl.updateOne);
app.delete('/posts/:id', postCtrl.deleteOne);

module.exports = app;
