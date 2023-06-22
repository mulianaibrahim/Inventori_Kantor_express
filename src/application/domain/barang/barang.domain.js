const Barang = require('../../../model/barang');
const {
    getKategori
} = require('../kategori/kategori.domain');
const {
    getLokasi
} = require('../lokasi/lokasi.domain');

async function searchBarang(namaBarang) {
    const response = await Barang.find({
        namaBarang: namaBarang
    });
    try {
        if (response.length < 1) {
            throw new Error();
        }
        return {
            status: 200,
            data: response,
        };
    } catch (error) {
        return {
            status: 404,
            message: 'Data barang tidak ada!',
        }
    }
}

async function fetchBarang() {
    const response = await Barang.find({}).populate(["kategori", "lokasi", "penggunaSaatIni"]);
    const dataBaru = response.map(function (d) {
        let pengguna;
        if (d.penggunaSaatIni !== null) {
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
    try {
        const response = await Barang.find({
            _id: id
        }).populate(["kategori", "lokasi", "penggunaSaatIni"]);

        if (response === null) {
            throw new Error();
        }
        const dataBaru = response.map(function (d) {
            let pengguna;
            if (d.penggunaSaatIni !== null) {
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
    } catch (error) {
        return {
            status: 404,
            message: 'Barang tidak ditemukan'
        };
    }
}

async function createBarang(dataBarang) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataBarang.createdAt = currentTime;
    dataBarang.updatedAt = currentTime;
    dataBarang.kodeBarang = generateRandomString(7);
    const kategori = await getKategori(dataBarang.kategori);
    const lokasi = await getLokasi(dataBarang.lokasi);
    try {
        if (kategori.status !== 200) {
            throw new Error('Kategori tersebut tidak ada');
        }
        if (lokasi.status !== 200) {
            throw new Error('Lokasi penyimpanan tersebut tidak ada');
        }
        dataBarang.penggunaSaatIni = null;
        await Barang.create(dataBarang);
        if (!Barang) {
            throw new Error("Gagal menambahkan Barang")
        }
        return {
            status: 200,
            data: dataBarang,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function updateBarang(id, dataBarang) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataBarang.updatedAt = currentTime;
    try {
        if (dataBarang.hasOwnProperty('kategori') && dataBarang.hasOwnProperty('lokasi')) {
            const kategori = await getKategori(dataBarang.kategori);
            const lokasi = await getLokasi(dataBarang.lokasi);
            if (kategori.status !== 200) {
                throw new Error('Kategori tersebut tidak ada');
            }
            if (lokasi.status !== 200) {
                throw new Error('Lokasi penyimpanan tersebut tidak ada');
            }
        }
        const update = await Barang.findByIdAndUpdate(id, dataBarang);
        if (!update) {
            throw new Error('Gagal memperbarui Barang', );
        }
        return {
            status: 200,
            data: dataBarang,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function deleteBarang(id) {
    try {
        await Barang.deleteOne({
            _id: id
        });
        return {
            status: 200,
            message: 'Berhasil menghapus Barang'
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Gagal menghapus Barang'
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
};