const Penggunaan = require('../../src/model/penggunaan');
const {
    insertBarang,
    deleteBarang
} = require('./barang');
const penggunaans = [{
        _id: '6486ef6fdc1c04f730a2c1d0',
        namaBarang: "6486ef6fdc1c04f730a2c1d0",
        pengguna: "6486ef6fdc1c04f730a2c1d0",
        tanggalMulaiPenggunaan: "2022-09-30",
        kondisiAwal: "BAIK",
        statusPenggunaan: "BERLANGSUNG"
    },
    {
        _id: '6486ef6fdc1c04f730a2c1d1',
        namaBarang: "64871282407585f33503200c",
        pengguna: "6486ef6fdc1c04f730a2c1d0",
        tanggalMulaiPenggunaan: "2022-09-30",
        kondisiAwal: "BAIK",
        statusPenggunaan: "BERLANGSUNG"
    },
    {
        _id: '6486ef6fdc1c04f730a2c1d2',
        namaBarang: "6486ef78dc1c04f730a2c1d2",
        pengguna: "6486ef6fdc1c04f730a2c1d0",
        tanggalMulaiPenggunaan: "2022-09-30",
        kondisiAwal: "BAIK",
        statusPenggunaan: "BERLANGSUNG"
    },
    {
        _id: '6486ef6fdc1c04f730a2c1d3',
        namaBarang: "64871289c0c87723dd4a18f1",
        pengguna: "6486ef6fdc1c04f730a2c1d0",
        tanggalMulaiPenggunaan: "2022-09-30",
        kondisiAwal: "BAIK",
        statusPenggunaan: "BERLANGSUNG"
    },
];
async function insertPenggunaan() {
    await insertBarang();
    await Penggunaan.insertMany(penggunaans);
}
async function deletePenggunaan() {
    await Penggunaan.deleteMany({});
    await deleteBarang();
}

module.exports = {
    insertPenggunaan,
    deletePenggunaan,
};