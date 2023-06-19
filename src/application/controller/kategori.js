const {
    fetchKategori,
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori
} = require('../domain/kategori/kategori.domain');

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
    const kategoriData = {
        namaKategori: req.body.namaKategori.toUpperCase(),
    };
    const response = await createKategori(kategoriData);
    res.status(response.status).send(response);
}
async function updateOneKategori(req, res) {
    const id = req.params.id;
    const kategoriData = {
        namaKategori: req.body.namaKategori.toUpperCase(),
    };
    const response = await updateKategori(id, kategoriData);
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