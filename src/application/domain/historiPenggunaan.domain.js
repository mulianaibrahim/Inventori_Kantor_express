const HistoriPenggunaan = require('../../model/historiPenggunaan');

async function fetchHistoriPenggunaan() {
    const response = await HistoriPenggunaan.find({});
    return {
        status: 200,
        data: response,
    };
}

async function createHistoriPenggunaan(dataHistoriPenggunaan) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataHistoriPenggunaan.createdAt = currentTime;
    try {
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