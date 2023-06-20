const Barang = require('../../../model/barang');
const {
    searchKategori
} = require('../kategori/kategori.domain');

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
            message: 'Data kategori tidak ada!',
        }
    }
}

async function fetchBarang() {
    const response = await Barang.find({});
    return {
        status: 200,
        data: response,
    };
}

async function getBarang(id) {
    try {
        const response = await Barang.findOne({
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
    dataBarang.penggunaSaatIni = "-";
    dataBarang.kodeBarang = generateRandomString(7);
    const search = await searchKategori(dataBarang.kategori);
    try {
        if (search.status !== 200) {
            throw new Error('Kategori tersebut tidak ada');
        }
        const create = new Barang(dataBarang);
        const data = await create.save();
        if (!data) {
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
    dataBarang.penggunaSaatIni = "-";
    const search = await searchKategori(dataBarang.kategori);
    try {
        if (search.status !== 200) {
            throw new Error('Kategori tersebut tidak ada');
        }
        const update = await Barang.updateOne({
            _id: id
        }, dataBarang);
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