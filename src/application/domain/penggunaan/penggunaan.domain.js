const Penggunaan = require('../../../model/penggunaan');
const {
    getBarang,
    updateBarang
} = require('../barang/barang.domain');

async function fetchPenggunaan() {
    const response = await Penggunaan.find({});
    return {
        status: 200,
        data: response,
    };
}

async function getPenggunaan(id) {
    try {
        const response = await Penggunaan.findOne({
            _id: id
        });
        if (response === null) {
            throw new Error();
        }
        return {
            status: 200,
            data: response
        };
    } catch (error) {
        return {
            status: 404,
            message: 'Penggunaan tidak ditemukan'
        };
    }
}

async function createPenggunaan(dataPenggunaan) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataPenggunaan.statusPenggunaan = "BERLANGSUNG";
    dataPenggunaan.createdAt = currentTime;
    dataPenggunaan.updatedAt = currentTime;
    const searchBarang = await getBarang(dataPenggunaan.namaBarang);
    try {
        if (searchBarang.data[0].penggunaSaatIni === null) {
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
async function updatePenggunaan(id, dataPenggunaan) {
    const currentTime = new Date();
    const offset = 420;
    currentTime.setMinutes(currentTime.getMinutes() + offset);
    dataPenggunaan.updatedAt = currentTime;
    try {
        const update = await Penggunaan.updateOne({
            _id: id
        }, dataPenggunaan);
        if (!update) {
            throw new Error('Gagal memperbarui Penggunaan', );
        }
        return {
            status: 200,
            data: dataPenggunaan,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
async function deletePenggunaan(id) {
    try {
        await Penggunaan.deleteOne({
            _id: id
        });
        return {
            status: 200,
            message: 'Berhasil menghapus Penggunaan'
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Gagal menghapus Penggunaan'
        };
    }
}

module.exports = {
    fetchPenggunaan,
    getPenggunaan,
    createPenggunaan,
    updatePenggunaan,
    deletePenggunaan,
};