const Lokasi = require('../../model/lokasi');
const Barang = require('../../model/barang');

async function searchLokasi(keyValue) {
    const response = await Lokasi.find(keyValue);
    if (response.length < 1) {
        return {
            status: 404,
            message: 'Data lokasi penyimpanan tidak ada!',
        }
    } else {
        return {
            status: 200,
            data: response,
        };
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
            message: 'Lokasi penyimpanan tidak ditemukan'
        };
    }
}

async function createLokasi(dataLokasi) {
    try {
        const search = await searchLokasi({
            namaLokasi: dataLokasi.namaLokasi
        });
        if (search.status === 200) {
            return {
                status: 400,
                message: 'Nama lokasi penyimpanan sudah ada'
            };
        }
        await Lokasi.create(dataLokasi);
        return {
            status: 200,
            data: dataLokasi,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menambahkan lokasi penyimpanan"
        };
    }
}
async function updateLokasi(id, dataLokasi) {
    try {
        const search = await searchLokasi({
            namaLokasi: dataLokasi.namaLokasi
        });
        if (search.status === 200) {
            return {
                status: 400,
                message: 'Nama lokasi penyimpanan sudah ada'
            };
        }
        await Lokasi.updateOne({
            _id: id
        }, dataLokasi);
        return {
            status: 200,
            data: dataLokasi,
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Gagal memperbarui lokasi penyimpanan'
        };
    }
}
async function deleteLokasi(id) {
    try {
        const barang = await Barang.find({
            lokasi: id
        });
        if (barang.length === 0) {
            await Lokasi.deleteOne({
                _id: id
            });
            return {
                status: 200,
                message: 'Berhasil menghapus lokasi penyimpanan'
            };
        }
        return {
            status: 400,
            message: `Tidak dapat di hapus. Ada barang yang disimpan ditempat penyimpanan ini!`
        }

    } catch (error) {
        return {
            status: 500,
            message: "Gagal menghapus lokasi penyimpanan!"
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