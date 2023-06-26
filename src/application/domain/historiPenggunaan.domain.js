const HistoriPenggunaan = require('../../model/historiPenggunaan');
const { gmt7 } = require('../domain/currentTime');

async function fetchHistoriPenggunaan() {
    const response = await HistoriPenggunaan.find({});
    return {
        status: 200,
        data: response,
    };
}

async function createHistoriPenggunaan(dataHistoriPenggunaan) {
    try {
        dataHistoriPenggunaan.createdAt = gmt7();
        await HistoriPenggunaan.create(dataHistoriPenggunaan);
        return {
            status: 200,
            data: dataHistoriPenggunaan,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Aksi gagal!"
        };
    }
}

module.exports = {
    fetchHistoriPenggunaan,
    createHistoriPenggunaan,
};