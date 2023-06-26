const Karyawan = require('../../model/karyawan');
const Barang = require('../../model/barang');

async function searchKaryawan(keyValue){
    const response = await Karyawan.find(keyValue);
        if(response.length < 1){
            return {
                status: 404,
                message: 'Data karyawan tidak ada!',
            }
        }
        return {
            status: 200,
            data: response,
        };
}

async function fetchKaryawan() {
    const response = await Karyawan.find({});
    return {
        status: 200,
        data: response,
    };
}

async function getKaryawan(id) {
    try {
        const response = await Karyawan.findOne({
            _id: id
        });
        if(!response){
            throw new Error();
        }
        return {
            status: 200,
            data: response
        };
    } catch (error) {
        return {
            status: 404,
            message: 'Karyawan tidak ditemukan'
        };
    }
}

async function createKaryawan(dataKaryawan) {
    const search = await searchKaryawan({namaKaryawan: dataKaryawan.namaKaryawan});
    try {
        if(search.status === 200){
            return {
                status: 400,
                message: 'Karyawan sudah ada',
            };
        }
        await Karyawan.create(dataKaryawan);
        return {
            status: 200,
            data: dataKaryawan,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menambahkan karyawan"
        };
    }
}
async function updateKaryawan(id, dataKaryawan) {
    try {
        const search = await searchKaryawan({namaKaryawan: dataKaryawan.namaKaryawan});
        if(search.status === 200){
            return {
                status: 400,
                message: 'Karyawan sudah ada',
            };
        }
        await Karyawan.updateOne({
            _id: id
        }, dataKaryawan);
        return {
            status: 200,
            data: dataKaryawan,
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Gagal memperbarui karyawan'
        };
    }
}
async function deleteKaryawan(id) {
    try {
        const barang = await Barang.find({
            penggunaSaatIni: id
        });
        if(barang.length < 1){
            await Karyawan.deleteOne({
                _id: id
            });
            return {
                status: 200,
                message: 'Berhasil menghapus karyawan'
            };
        }else{
            return {
                status: 400,
                message: `Tidak dapat menghapus karyawan. Karywan tersebut sedang menggunakan barang ${barang.namaBarang}`
            };
        }
        
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menghapus karyawan"
        };
    }
}

module.exports = {
    fetchKaryawan,
    getKaryawan,
    createKaryawan,
    updateKaryawan,
    deleteKaryawan,
    searchKaryawan
};