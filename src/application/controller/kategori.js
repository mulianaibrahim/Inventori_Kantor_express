const {
    fetchKategori,
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori
} = require('../domain/kategori.domain');
const { gmt7 } = require('../domain/currentTime')

async function getAllKategori(req, res) {
    const response = await fetchKategori();
    res.status(response.status).send(response);
}
async function getOneKategori(req, res) {
    const id = req.params.id;
    const response = await getKategori(id);
    res.status(response.status).send(response);
}
async function addKategori(req, res) {
    const dataKategori = {
        namaKategori: req.body.namaKategori.toUpperCase(),
        createdAt: gmt7(),
        updatedAt: gmt7(),
    };
    const response = await createKategori(dataKategori);
    res.status(response.status).send(response);
}
async function updateOneKategori(req, res) {
    const id = req.params.id;
    const dataKategori = {
        namaKategori: req.body.namaKategori.toUpperCase(),
        updatedAt: gmt7(),
    };
    const response = await updateKategori(id, dataKategori);
    res.status(response.status).send(response);
}
async function deleteOneKategori(req, res) {
    const id = req.params.id;
    const response = await deleteKategori(id);
    res.status(response.status).send(response);
}

module.exports = {
    getAllKategori,
    getOneKategori,
    addKategori,
    updateOneKategori,
    deleteOneKategori,
};