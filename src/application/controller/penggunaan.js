const {
    fetchPenggunaan,
    createPenggunaan,
    selesaikanPenggunaan
} = require('../domain/penggunaan/penggunaan.domain');

async function getAllPenggunaan(req, res) {
    const response = await fetchPenggunaan();
    res.status(response.status).send(response);
}
async function addPenggunaan(req, res) {
    const dataPenggunaan = {
        namaBarang: req.body.namaBarang,
        pengguna: req.body.pengguna,
        tanggalMulaiPenggunaan: req.body.tanggalMulaiPenggunaan,
    };
    const response = await createPenggunaan(dataPenggunaan);
    res.status(response.status).send(response);
}
async function finishPenggunaan(req, res) {
    const id = req.params.id;
    const dataPenggunaan = {
        kondisiPengembalian: req.body.kondisiPengembalian
    };
    const response = await selesaikanPenggunaan(id, dataPenggunaan);
    res.status(response.status).send(response);
}

module.exports = {
    getAllPenggunaan,
    addPenggunaan,
    finishPenggunaan,
};