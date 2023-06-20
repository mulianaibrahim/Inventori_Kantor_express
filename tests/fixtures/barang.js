const Barang = require('../../src/model/barang');
const barangs = [{
        _id: '6486ef6fdc1c04f730a2c1d0',
        kodeBarang: '123456',
        namaBarang: "TES",
        kategori: "kategori1",
        tanggalPerolehan: "2022-05-02",
        hargaPerolehan: 100000,
        masaGuna: "12 BULAN",
        kondisi: "BAIK",
        lokasi: "RAK ATAS",
        penggunaSaatIni: "-"
    },
    {
        _id: '6486ef78dc1c04f730a2c1d2',
        kodeBarang: '654321',
        namaBarang: "TES",
        kategori: "kategori1",
        tanggalPerolehan: "2022-05-02",
        hargaPerolehan: 100000,
        masaGuna: "12 BULAN",
        kondisi: "BAIK",
        lokasi: "RAK ATAS",
        penggunaSaatIni: "-"
    },
    {
        _id: '64871282407585f33503200c',
        kodeBarang: '544244',
        namaBarang: "TES",
        kategori: "kategori1",
        tanggalPerolehan: "2022-05-02",
        hargaPerolehan: 100000,
        masaGuna: "12 BULAN",
        kondisi: "BAIK",
        lokasi: "RAK ATAS",
        penggunaSaatIni: "-"
    },
    {
        _id: '64871289c0c87723dd4a18f0',
        kodeBarang: '454578',
        namaBarang: "TES",
        kategori: "kategori1",
        tanggalPerolehan: "2022-05-02",
        hargaPerolehan: 100000,
        masaGuna: "12 BULAN",
        kondisi: "BAIK",
        lokasi: "RAK ATAS",
        penggunaSaatIni: "-"
    },
];
async function insertBarang() {
    await Barang.insertMany(barangs);
}
async function deleteBarang() {
    await Barang.deleteMany({});
}

module.exports = {
    insertBarang,
    deleteBarang,
};