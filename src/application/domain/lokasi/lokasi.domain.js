const Lokasi = require('../../../model/lokasi');

async function searchLokasi(namaLokasi){
    const response = await Lokasi.find({namaLokasi: namaLokasi});
    try {
        if(response.length < 1){
            throw new Error();
        }
        return {
            status: 200,
            data: response,
        };
    } catch (error) {
        return {
            status: 404,
            message: 'Data lokasi penyimpanan tidak ada!',
        }
    }
}

async function fetchLokasi() {
    const response = await Lokasi.find({});
    return {
        status: 200,
        data: response,
    };
}

async function getLokasi(id) {
    try {
        const response = await Lokasi.findOne({
            _id: id
        });
        if(response === null){
            throw new Error();
        }
        return {
            status: 200,
            data: response
        };
    } catch (error) {
        return {
            status: 404,
            message: 'Lokasi penyimpanan tidak ditemukan'
        };
    }
}

async function createLokasi(dataLokasi) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataLokasi.createdAt = currentTime;
    dataLokasi.updatedAt = currentTime;
    const search = await searchLokasi(dataLokasi.namaLokasi);
    try {
        if(search.status === 200){
            throw new Error('Nama lokasi penyimpanan sudah ada');
        }
        await Lokasi.create(dataLokasi);
        if (!Lokasi) {
            throw new Error("Gagal menambahkan lokasi penyimpanan")
        }
        return {
            status: 200,
            data: dataLokasi,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function updateLokasi(id, dataLokasi) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataLokasi.updatedAt = currentTime;
    const search = await searchLokasi(dataLokasi.namaLokasi);
    try {
        if(search.status === 200){
            throw new Error('Nama lokasi penyimpanan sudah ada');
        }
        const update = await Lokasi.updateOne({
            _id: id
        }, dataLokasi);
        if (!update) {
            throw new Error('Gagal memperbarui lokasi penyimpanan', );
        }
        return {
            status: 200,
            data: dataLokasi,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function deleteLokasi(id) {
    try {
        await Lokasi.deleteOne({
            _id: id
        });
        return {
            status: 200,
            message: 'Berhasil menghapus lokasi penyimpanan'
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Gagal menghapus lokasi penyimpanan'
        };
    }
}

module.exports = {
    fetchLokasi,
    getLokasi,
    createLokasi,
    updateLokasi,
    deleteLokasi,
    searchLokasi
};