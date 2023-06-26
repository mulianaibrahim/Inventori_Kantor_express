const Penggunaan = require('../../model/penggunaan');
const Barang = require('../../model/barang');

const {
    createHistoriPenggunaan
} = require('./historiPenggunaan.domain');

async function fetchPenggunaan() {
    const response = await Penggunaan.find({}).populate(['namaBarang', 'pengguna']);
    const dataBaru = response.map(function (d) {
        return {
            _id: d._id,
            namaBarang: d.namaBarang.namaBarang,
            pengguna: d.pengguna.namaKaryawan,
            tanggalMulaiPenggunaan: d.tanggalMulaiPenggunaan,
            kondisiAwal: d.kondisiAwal,
            statusPenggunaan: d.statusPenggunaan,
            createdAt: d.createdAt,
        }
    });
    return {
        status: 200,
        data: dataBaru,
    };
}

async function createPenggunaan(dataPenggunaan) {
    try {
        const currentTime = new Date();
        const offset = 420;
        currentTime.setMinutes(currentTime.getMinutes() + offset);
        dataPenggunaan.statusPenggunaan = "BERLANGSUNG";
        dataPenggunaan.createdAt = currentTime;
        const searchBarang = await Barang.findOne({
            _id: dataPenggunaan.namaBarang
        });
        dataPenggunaan.kondisiAwal = searchBarang.kondisi;
        if (searchBarang.penggunaSaatIni !== null) {
            return {
                status: 400,
                message: "Barang tersebut sedang digunakan",
            };
        } else {
            const barangUpdate = await Barang.updateOne({
                _id: dataPenggunaan.namaBarang
            }, {
                penggunaSaatIni: dataPenggunaan.pengguna
            }, {
                returnNewDocument: true
            });
            if (barangUpdate.modifiedCount === 1) {
                const buatPenggunaan = await Penggunaan.create(dataPenggunaan);
                if (!buatPenggunaan) {
                    await Barang.updateOne({
                        _id: dataPenggunaan.namaBarang
                    }, {
                        penggunaSaatIni: null
                    }, {
                        returnNewDocument: true
                    });
                    throw new Error();
                } else {
                    return {
                        status: 200,
                        data: dataPenggunaan,
                    };

                }
            } else {
                return {
                    status: 400,
                    message: "Gagal memperbarui data penggunaSaatIni pada collection barang",
                };
            }
        }

    } catch (error) {
        return {
            status: 500,
            message: "Aksi gagal dilakukan"
        };
    }
}

async function selesaikanPenggunaan(id, dataPenggunaan) {
    try {
        const currentTime = new Date();
        const offset = 420;
        currentTime.setMinutes(currentTime.getMinutes() + offset);
        if (dataPenggunaan.kondisiPengembalian !== null) {
            const pengguna = await Penggunaan.findById(id);
            const barang = await Barang.findOne({
                _id: pengguna.namaBarang
            });
            const kondisiKembali = dataPenggunaan.kondisiPengembalian.toUpperCase();
            const histori = {
                namaBarang: barang.namaBarang,
                pengguna: barang.penggunaSaatIni,
                tanggalMulaiPenggunaan: pengguna.tanggalMulaiPenggunaan,
                tanggalSelesaiPenggunaan: currentTime,
                kondisiAwal: barang.kondisi,
                kondisiPengembalian: kondisiKembali
            };
            createHistoriPenggunaan(histori);
            await Barang.updateOne({
                _id: barang._id
            }, {
                penggunaSaatIni: null,
                kondisi: kondisiKembali
            }, {
                returnNewDocument: true
            });
            await Penggunaan.deleteOne({
                _id: id
            });
            return {
                status: 200,
                data: dataPenggunaan,
            };
        } else {
            return {
                status: 400,
                message: 'Kondisi pengembalian harus diisi!'
            };
        }
    } catch (error) {
        return {
            status: 500,
            message: "Aksi gagal dilakukan!"
        };
    }
}

module.exports = {
    fetchPenggunaan,
    createPenggunaan,
    selesaikanPenggunaan,
};