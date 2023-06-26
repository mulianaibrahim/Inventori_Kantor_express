const {
    fetchKaryawan,
    getKaryawan,
    createKaryawan,
    updateKaryawan,
    deleteKaryawan
} = require('../domain/karyawan.domain');
const { gmt7 } = require('../domain/currentTime');

async function getAllKaryawan(req, res) {
    const response = await fetchKaryawan();
    res.status(response.status).send(response);
}
async function getOneKaryawan(req, res) {
    const id = req.params.id;
    const response = await getKaryawan(id);
    res.status(response.status).send(response);
}
async function addKaryawan(req, res) {
    const dataKaryawan = {
        namaKaryawan: req.body.namaKaryawan.toUpperCase(),
        createdAt: gmt7(),
        updatedAt: gmt7(),
    };
    const response = await createKaryawan(dataKaryawan);
    res.status(response.status).send(response);
}
async function updateOneKaryawan(req, res) {
    const id = req.params.id;
    const dataKaryawan = {
        namaKaryawan: req.body.namaKaryawan.toUpperCase(),
        updatedAt: gmt7(),
    };
    const response = await updateKaryawan(id, dataKaryawan);
    res.status(response.status).send(response);
}
async function deleteOneKaryawan(req, res) {
    const id = req.params.id;
    const response = await deleteKaryawan(id);
    res.status(response.status).send(response);
}

module.exports = {
    getAllKaryawan,
    getOneKaryawan,
    addKaryawan,
    updateOneKaryawan,
    deleteOneKaryawan,
};