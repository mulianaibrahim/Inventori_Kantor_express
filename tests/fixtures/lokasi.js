const Lokasi = require('../../src/model/lokasi');
const lokasis = [
  {
    _id: '6486ef6fdc1c04f730a2c1d0',
    namaLokasi: 'lokasi1',
  },
  {
    _id: '6486ef78dc1c04f730a2c1d2',
    namaLokasi: 'LOKASI2',
  },
  {
    _id: '64871282407585f33503200c',
    namaLokasi: 'lokasi3',
  },
  {
    _id: '64871289c0c87723dd4a18f0',
    namaLokasi: 'lokasi4',
  },
];
async function insertLokasi() {
  await Lokasi.insertMany(lokasis);
}
async function deleteLokasi() {
  await Lokasi.deleteMany({});
}

module.exports = {
  insertLokasi,
  deleteLokasi,
};