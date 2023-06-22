const {
    fetchPenggunaan,
    getPenggunaan,
    createPenggunaan,
    updatePenggunaan,
    deletePenggunaan
} = require('../domain/penggunaan/penggunaan.domain');

async function getAllPenggunaan(req, res) {
    const response = await fetchPenggunaan();
    res.status(response.status).send(response);
}
async function getOnePenggunaan(req, res) {
    const id = req.params.id;
    const response = await getPenggunaan(id);
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
async function updateOnePenggunaan(req, res) {
    const id = req.params.id;
    const dataPenggunaan = {
        namaBarang: req.body.namaBarang,
        pengguna: req.body.pengguna,
        tanggalMulaiPenggunaan: req.body.tanggalMulaiPenggunaan,
    };
    const response = await updatePenggunaan(id, dataPenggunaan);
    res.status(response.status).send(response);
}
async function deleteOnePenggunaan(req, res) {
    const id = req.params.id;
    const response = await deletePenggunaan(id);
    res.status(response.status).send(response);
}

module.exports = {
    getAllPenggunaan,
    getOnePenggunaan,
    addPenggunaan,
    updateOnePenggunaan,
    deleteOnePenggunaan,
};