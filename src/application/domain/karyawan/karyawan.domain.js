const Karyawan = require('../../../model/karyawan');
const Barang = require('../../../model/barang');

async function searchKaryawan(namaKaryawan){
    const response = await Karyawan.find({namaKaryawan: namaKaryawan});
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
            message: 'Data karyawan tidak ada!',
        }
    }
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
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataKaryawan.createdAt = currentTime;
    dataKaryawan.updatedAt = currentTime;
    const search = await searchKaryawan(dataKaryawan.namaKaryawan);
    try {
        if(search.status === 200){
            throw new Error('Karyawan sudah ada');
        }
        await Karyawan.create(dataKaryawan);
        if (!Karyawan) {
            throw new Error("Gagal menambahkan karyawan")
        }
        return {
            status: 200,
            data: dataKaryawan,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function updateKaryawan(id, dataKaryawan) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataKaryawan.updatedAt = currentTime;
    const search = await searchKaryawan(dataKaryawan.namaKaryawan);
    try {
        if(search.status === 200){
            throw new Error('Karyawan sudah ada');
        }
        const update = await Karyawan.updateOne({
            _id: id
        }, dataKaryawan);
        if (!update) {
            throw new Error('Gagal memperbarui karyawan', );
        }
        return {
            status: 200,
            data: dataKaryawan,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function deleteKaryawan(id) {
    try {
        const barang = await Barang.findOne({
            penggunaSaatIni: id
        });
        if(!barang){
            await Karyawan.deleteOne({
                _id: id
            });
            return {
                status: 200,
                message: 'Berhasil menghapus karyawan'
            };
        }else{
            throw new Error(`Tidak dapat menghapus karyawan. Karywan tersebut sedang menggunakan barang ${barang.namaBarang}`)
        }
        
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}

module.exports = {
    fetchKaryawan,
    getKaryawan,
    createKaryawan,
    updateKaryawan,
    deleteKaryawan,
};