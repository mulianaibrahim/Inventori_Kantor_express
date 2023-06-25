const Penggunaan = require('../../model/penggunaan');
const {
    getBarang,
    updateBarang
} = require('./barang.domain');

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
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataPenggunaan.statusPenggunaan = "BERLANGSUNG";
    dataPenggunaan.createdAt = currentTime;
    const searchBarang = await getBarang(dataPenggunaan.namaBarang);
    try {
        if (searchBarang.status === 200 && searchBarang.data[0].penggunaSaatIni === null) {
            dataPenggunaan.kondisiAwal = searchBarang.data[0].kondisi;
            await Penggunaan.create(dataPenggunaan);
            await updateBarang(dataPenggunaan.namaBarang, { penggunaSaatIni: dataPenggunaan.pengguna });
            if (!Penggunaan) {
                throw new Error("Gagal menambahkan")
            }
            return {
                status: 200,
                data: dataPenggunaan,
            };
        } else {
            throw new Error("Barang tersebut sedang digunakan");
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}

async function selesaikanPenggunaan(id, dataPenggunaan) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    const pengguna = await Penggunaan.findById(id);
    const barang = await getBarang(pengguna.namaBarang);
    try {
        if(dataPenggunaan.kondisiPengembalian !== null){
            const kondisiKembali = dataPenggunaan.kondisiPengembalian.toUpperCase();
            const histori = {
                namaBarang: barang.data[0].namaBarang,
                pengguna: barang.data[0].penggunaSaatIni,
                tanggalMulaiPenggunaan: pengguna.tanggalMulaiPenggunaan,
                tanggalSelesaiPenggunaan: currentTime,
                kondisiAwal: barang.data[0].kondisi,
                kondisiPengembalian: kondisiKembali
            };
            createHistoriPenggunaan(histori);
            await updateBarang(barang.data[0]._id, { penggunaSaatIni: null, kondisi: kondisiKembali});
            await Penggunaan.deleteOne({_id: id});
            return {
                status: 200,
                data: dataPenggunaan,
            };
        }else{
            throw new Error('Kondisi pengembalian harus diisi!');
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}

module.exports = {
    fetchPenggunaan,
    createPenggunaan,
    selesaikanPenggunaan,
};