const {
    fetchLokasi,
    getLokasi,
    createLokasi,
    updateLokasi,
    deleteLokasi
} = require('../domain/lokasi.domain');
const { gmt7 } = require('../domain/currentTime')

async function getAllLokasi(req, res) {
    const response = await fetchLokasi();
    res.status(response.status).send(response);
}
async function getOneLokasi(req, res) {
    const id = req.params.id;
    const response = await getLokasi(id);
    res.status(response.status).send(response);
}
async function addLokasi(req, res) {
    const dataLokasi = {
        namaLokasi: req.body.namaLokasi.toUpperCase(),
        createdAt: gmt7(),
        updatedAt: gmt7(),
    };
    const response = await createLokasi(dataLokasi);
    res.status(response.status).send(response);
}
async function updateOneLokasi(req, res) {
    const id = req.params.id;
    const dataLokasi = {
        namaLokasi: req.body.namaLokasi.toUpperCase(),
        updatedAt: gmt7(),
    };
    const response = await updateLokasi(id, dataLokasi);
    res.status(response.status).send(response);
}
async function deleteOneLokasi(req, res) {
    const id = req.params.id;
    const response = await deleteLokasi(id);
    res.status(response.status).send(response);
}

module.exports = {
    getAllLokasi,
    getOneLokasi,
    addLokasi,
    updateOneLokasi,
    deleteOneLokasi,
};