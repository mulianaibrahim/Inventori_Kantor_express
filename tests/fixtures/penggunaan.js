const Penggunaan = require('../../src/model/penggunaan');
const penggunaans = [{
        _id: '6486ef6fdc1c04f730a2c1d0',
        namaBarang: "6486ef6fdc1c04f730a2c1d0",
        pengguna: "6486ef6fdc1c04f730a2c1d0",
        tanggalMulaiPenggunaan: "2022-09-30",
        kondisiAwal: "BAIK",
        statusPenggunaan: "BERLANGSUNG"
    },
];
async function insertPenggunaan() {
    await Penggunaan.insertMany(penggunaans);
}
async function deletePenggunaan() {
    await Penggunaan.deleteMany({});
}

module.exports = {
    insertPenggunaan,
    deletePenggunaan,
};