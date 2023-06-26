const {
    fetchBarang,
    getBarang,
    createBarang,
    updateBarang,
    deleteBarang
} = require('../domain/barang.domain');
const { gmt7 } = require('../domain/currentTime');

async function getAllBarang(req, res) {
    const response = await fetchBarang();
    res.status(response.status).send(response);
}
async function getOneBarang(req, res) {
    const id = req.params.id;
    const response = await getBarang(id);
    res.status(response.status).send(response);
}
async function addBarang(req, res) {
    const dataBarang = {
        namaBarang: req.body.namaBarang.toUpperCase(),
        kategori: req.body.kategori,
        tanggalPerolehan: req.body.tanggalPerolehan,
        hargaPerolehan: req.body.hargaPerolehan,
        masaGuna: req.body.masaGuna.toUpperCase(),
        kondisi: req.body.kondisi.toUpperCase(),
        lokasi: req.body.lokasi,
        penggunaSaatIni: null,
        createdAt: gmt7(),
        updatedAt: gmt7()
    };
    const response = await createBarang(dataBarang);
    res.status(response.status).send(response);
}
async function updateOneBarang(req, res) {
    const id = req.params.id;
    const dataBarang = {
        namaBarang: req.body.namaBarang.toUpperCase(),
        kategori: req.body.kategori,
        tanggalPerolehan: req.body.tanggalPerolehan,
        hargaPerolehan: req.body.hargaPerolehan,
        masaGuna: req.body.masaGuna.toUpperCase(),
        kondisi: req.body.kondisi.toUpperCase(),
        lokasi: req.body.lokasi,
        updatedAt: gmt7()
    };
    const response = await updateBarang(id, dataBarang);
    res.status(response.status).send(response);
}
async function deleteOneBarang(req, res) {
    const id = req.params.id;
    const response = await deleteBarang(id);
    res.status(response.status).send(response);
}

module.exports = {
    getAllBarang,
    getOneBarang,
    addBarang,
    updateOneBarang,
    deleteOneBarang,
};