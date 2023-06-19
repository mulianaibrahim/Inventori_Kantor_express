const Kategori = require('../../../model/kategori');

async function searchKategori(namaKategori){
    const response = await Kategori.find({namaKategori: namaKategori});
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
            message: 'Data kategori tidak ada!',
        }
    }
}

async function fetchKategori() {
    const response = await Kategori.find({});
    return {
        status: 200,
        data: response,
    };
}

async function getKategori(id) {
    try {
        const response = await Kategori.findOne({
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
            message: 'Kategori tidak ditemukan'
        };
    }
}

async function createKategori(dataKategori) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataKategori.createdAt = currentTime;
    dataKategori.updatedAt = currentTime;
    const search = await searchKategori(dataKategori.namaKategori);
    try {
        if(search.status === 200){
            throw new Error('Kategori sudah ada');
        }
        const create = new Kategori(dataKategori);
        const data = await create.save();
        if (!data) {
            throw new Error("Gagal menambahkan kategori")
        }
        return {
            status: 200,
            data: dataKategori,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function updateKategori(id, dataKategori) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataKategori.updatedAt = currentTime;
    const search = await searchKategori(dataKategori.namaKategori);
    try {
        if(search.status === 200){
            throw new Error('Kategori sudah ada');
        }
        const update = await Kategori.updateOne({
            _id: id
        }, dataKategori);
        if (!update) {
            throw new Error('Gagal memperbarui kategori', );
        }
        return {
            status: 200,
            data: dataKategori,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function deleteKategori(id) {
    try {
        const destroy = await Kategori.deleteOne({
            _id: id
        });
        if (!destroy) {
            throw new Error('Gagal menghapus kategori', );
        }
        return {
            status: 200,
            message: 'Berhasil menghapus kategori'
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}

module.exports = {
    fetchKategori,
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori,
    searchKategori
};