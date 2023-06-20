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
            message: 'Data Lokasi tidak ada!',
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
            message: 'Lokasi tidak ditemukan'
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
            throw new Error('Nama lokasi barang sudah ada');
        }
        const create = new Lokasi(dataLokasi);
        const data = await create.save();
        if (!data) {
            throw new Error("Gagal menambahkan Lokasi")
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
            throw new Error('Nama lokasi barang sudah ada');
        }
        const update = await Lokasi.updateOne({
            _id: id
        }, dataLokasi);
        if (!update) {
            throw new Error('Gagal memperbarui Lokasi', );
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
            message: 'Berhasil menghapus Lokasi'
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Gagal menghapus Lokasi'
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