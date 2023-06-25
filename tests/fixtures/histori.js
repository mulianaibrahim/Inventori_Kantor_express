const HistoriPenggunaan = require('../../src/model/historiPenggunaan');
const historis = [{
        _id: '6486ef6fdc1c04f730a2c1d0',
        namaBarang: "6486ef6fdc1c04f730a2c1d0",
        pengguna: "6486ef6fdc1c04f730a2c1d0",
        tanggalMulaiPenggunaan: "2022-09-30",
        tanggalSelesaiPenggunaan: "2022-07-12",
        kondisiAwal: "BAIK",
        kondisiPengembalian: "KEYBOARD RUSAK"
    },
];
async function insertHistoriPenggunaan() {
    await HistoriPenggunaan.insertMany(historis);
}
async function deleteHistoriPenggunaan() {
    await HistoriPenggunaan.deleteMany({});
}

module.exports = {
    historis,
    insertHistoriPenggunaan,
    deleteHistoriPenggunaan,
};