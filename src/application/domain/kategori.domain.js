const Kategori = require('../../model/kategori');
const {
    searchBarang
} = require('./barang.domain');

async function searchKategori(keyValue) {
    const response = await Kategori.find(keyValue);
    if(response.length === 0){
        return {
            status: 404,
            message: "Kategori tidak ditemukan",
        };
    }
    return {
        status: 200,
        data: response,
    };
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
        if (!response) {
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
    try {
        const search = await searchKategori({namaKategori: dataKategori.namaKategori});
        if (search.status === 200) {
            return {
                status: 400,
                message: 'Kategori sudah ada',
            };
        }
        await Kategori.create(dataKategori);

        return {
            status: 200,
            data: dataKategori,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal membuat kategori"
        };
    }
}
async function updateKategori(id, dataKategori) {
    try {
        const search = await searchKategori({namaKategori: dataKategori.namaKategori});
        if (search.status === 200) {
            return {
                status: 400,
                message: 'Kategori sudah ada',
            };
        }
        await Kategori.updateOne({
            _id: id
        }, dataKategori);
        return {
            status: 200,
            data: dataKategori,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal memperbarui kategori"
        };
    }
}
async function deleteKategori(id) {
    try {
        const barang = await searchBarang({
            kategori: id
        });
        if(barang.status === 404){
            await Kategori.deleteOne({
                _id: id
            });
            return {
                status: 200,
                message: 'Berhasil menghapus kategori'
            };
        }else{
            return {
                status: 400,
                message: `Tidak dapat di hapus. Kategori ini terhubung dengan ${barang.namaBarang} !`
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menghapus kategori"
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