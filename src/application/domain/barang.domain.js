const Barang = require('../../model/barang');
const Kategori = require('../../model/kategori');
const Lokasi = require('../../model/lokasi');

async function searchBarang(keyValue) {
    const response = await Barang.find(keyValue);
    if(response.length === 0){
        return {
            status: 404,
            message: "Barang tidak ditemukan",
        };
    }
    return {
        status: 200,
        data: response,
    };
}

async function fetchBarang() {
    const response = await Barang.find({}).populate(["kategori", "lokasi", "penggunaSaatIni"]).lean().exec();
    const dataBaru = response.map(function (d) {
        let pengguna;
        if (d.penggunaSaatIni !== null && d.penggunaSaatIni !== undefined) {
            pengguna = d.penggunaSaatIni.namaKaryawan
        } else {
            pengguna = null;
        }
        return {
            _id: d._id,
            kodeBarang: d.kodeBarang,
            namaBarang: d.namaBarang,
            kategori: d.kategori.namaKategori,
            tanggalPerolehan: d.tanggalPerolehan,
            hargaPerolehan: d.hargaPerolehan,
            masaGuna: d.masaGuna,
            kondisi: d.kondisi,
            lokasi: d.lokasi.namaLokasi,
            penggunaSaatIni: pengguna,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        }
    });
    return {
        status: 200,
        data: dataBaru,
    };
}

async function getBarang(id) {
    try{
        const response = await Barang.find({_id: id}).populate(["kategori", "lokasi", "penggunaSaatIni"]);
        if (response.length !== 0) {
            const dataBaru = response.map(function (d) {
                let pengguna;
                if (d.penggunaSaatIni !== null && d.penggunaSaatIni !== undefined) {
                    pengguna = d.penggunaSaatIni.namaKaryawan
                } else {
                    pengguna = null;
                }
                return {
                    _id: d._id,
                    kodeBarang: d.kodeBarang,
                    namaBarang: d.namaBarang,
                    kategori: d.kategori.namaKategori,
                    tanggalPerolehan: d.tanggalPerolehan,
                    hargaPerolehan: d.hargaPerolehan,
                    masaGuna: d.masaGuna,
                    kondisi: d.kondisi,
                    lokasi: d.lokasi.namaLokasi,
                    penggunaSaatIni: pengguna,
                    createdAt: d.createdAt,
                    updatedAt: d.updatedAt,
                }
            });
    
            return {
                status: 200,
                data: dataBaru
            };
        }else{
            throw new Error();   
        }
    }catch(error){
        return {
            status: 404,
            message: 'Barang tidak ditemukan'
        };
    }
        
}

async function createBarang(dataBarang) {
    dataBarang.kodeBarang = generateRandomString(7);
    try {
        const kategori = await Kategori.find({_id: dataBarang.kategori});
        const lokasi = await Lokasi.find({_id: dataBarang.lokasi});
        if (kategori.length < 1) {
            return {
                status: 400,
                message: 'Kategori tersebut tidak ada'
            };
        }
        if (lokasi.length < 1) {
            return {
                status: 400,
                message: 'Lokasi penyimpanan tersebut tidak ada'
            };
        }
        await Barang.create(dataBarang);
        return {
            status: 200,
            data: dataBarang,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menambahkan Barang"
        };
    }
}
async function updateBarang(id, dataBarang) {
    try {
        const kategori = await Kategori.find({_id: dataBarang.kategori});
        const lokasi = await Lokasi.find({_id: dataBarang.lokasi});
        if (kategori.length < 1) {
            return {
                status: 400,
                message: 'Kategori tersebut tidak ada'
            };
        }
        if (lokasi.length < 1) {
            return {
                status: 400,
                message: 'Lokasi penyimpanan tersebut tidak ada'
            };
        }
        await Barang.findByIdAndUpdate(id, dataBarang);
        return {
            status: 200,
            data: dataBarang,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal memperbarui data barang!"
        };
    }
}
async function deleteBarang(id) {
    try {
        const pengguna = await getBarang(id);
        
        if(pengguna.data[0].penggunaSaatIni === null){
            await Barang.deleteOne({
                _id: id
            });
            return {
                status: 200,
                message: 'Berhasil menghapus Barang'
            };
        }else{
            return {
                status: 400,
                message: `Tidak dapat menghapus. Barang ini sedang digunakan oleh ${pengguna.data[0].penggunaSaatIni}`
            };
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menghapus data barang"
        };
    }
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}

module.exports = {
    fetchBarang,
    getBarang,
    createBarang,
    updateBarang,
    deleteBarang,
    searchBarang,
    generateRandomString
};