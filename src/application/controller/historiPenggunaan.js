const {
    fetchHistoriPenggunaan,
} = require('../domain/historiPenggunaan.domain');

async function getAllHistoriPenggunaan(req, res) {
    const response = await fetchHistoriPenggunaan();
    res.status(response.status).send(response);
}

module.exports = {
    getAllHistoriPenggunaan
};