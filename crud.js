const express = require('express');
const bodyParser = require('body-parser');

// Inisialisasi Express
const app = express();
app.use(bodyParser.json());

// Data Inventaris Toko Swalayan
let inventaris = [
  { id: 1, kode: 'INV001', nama: 'Beras', jumlah: 100, kategori: 'Makanan' },
  { id: 2, kode: 'INV002', nama: 'Minyak Goreng', jumlah: 50, kategori: 'Makanan' },
  { id: 3, kode: 'INV003', nama: 'Sabun Mandi', jumlah: 200, kategori: 'Keperluan Rumah Tangga' }
];

// Mendapatkan daftar semua inventaris
app.get('/api/inventaris', (req, res) => {
  res.json(inventaris);
});

// Mendapatkan inventaris berdasarkan ID
app.get('/api/inventaris/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = inventaris.find(i => i.id === id);

  if (!item) {
    res.status(404).json({ error: 'Inventaris tidak ditemukan.' });
  } else {
    res.json(item);
  }
});

// Menambahkan inventaris baru
app.post('/api/inventaris', (req, res) => {
  const item = req.body;
  item.id = inventaris.length + 1;
  inventaris.push(item);
  res.status(201).json(item);
});

// Mengubah data inventaris berdasarkan ID
app.put('/api/inventaris/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = inventaris.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ error: 'Inventaris tidak ditemukan.' });
  } else {
    const item = req.body;
    item.id = id;
    inventaris[itemIndex] = item;
    res.json(item);
  }
});

// Menghapus inventaris berdasarkan ID
app.delete('/api/inventaris/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = inventaris.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ error: 'Inventaris tidak ditemukan.' });
  } else {
    const deletedItem = inventaris.splice(itemIndex, 1)[0];
    res.json(deletedItem);
  }
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000...');
});