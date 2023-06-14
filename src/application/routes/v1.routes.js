const express = require('express');
const app = express.Router();

const BarangCtrl = require('../controller/BarangController') 

//post
app.get('/barang', BarangCtrl.getAllBarang);
app.get('/barang/:id', BarangCtrl.getOneBarang);
app.post('/barang', BarangCtrl.addBarang);
app.put('/barang/:id', BarangCtrl.updateOneBarang);
app.delete('/barang/:id', BarangCtrl.deleteOneBarang);

module.exports =  app;