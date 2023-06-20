const Karyawan = require('../../src/model/karyawan');
const karyawans = [
  {
    _id: '6486ef6fdc1c04f730a2c1d0',
    namaKaryawan: 'Karyawan 1',
  },
  {
    _id: '6486ef78dc1c04f730a2c1d2',
    namaKaryawan: 'KARYAWAN 2',
  },
  {
    _id: '64871282407585f33503200c',
    namaKaryawan: 'Karyawan 3',
  },
  {
    _id: '64871289c0c87723dd4a18f0',
    namaKaryawan: 'Karyawan 4',
  },
];
async function insertKaryawan() {
  await Karyawan.insertMany(karyawans);
}
async function deleteKaryawan() {
  await Karyawan.deleteMany({});
}

module.exports = {
  insertKaryawan,
  deleteKaryawan,
};