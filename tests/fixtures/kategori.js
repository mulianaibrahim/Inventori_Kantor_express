const Kategori = require('../../src/model/kategori');
const kategoris = [
  {
    _id: '6486ef6fdc1c04f730a2c1d0',
    namaKategori: 'kategori1',
  },
  {
    _id: '6486ef78dc1c04f730a2c1d2',
    namaKategori: 'KATEGORI2',
  },
  {
    _id: '64871282407585f33503200c',
    namaKategori: 'kategori3',
  },
  {
    _id: '64871289c0c87723dd4a18f0',
    namaKategori: 'kategori4',
  },
];
async function insertKategori() {
  await Kategori.insertMany(kategoris);
}
async function deleteKategori() {
  await Kategori.deleteMany({});
}

module.exports = {
  insertKategori,
  deleteKategori,
};