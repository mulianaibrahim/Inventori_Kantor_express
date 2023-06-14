const Barang = require ('../../../model/barang');

async function fetchBarang() {
  const data = await Barang.find({});
  return { data, status: 200 };
}
async function getBarang(id) {
  try {
    const response = await Barang.findOne({ _id: id });
    return { data: response, status: 200 };
  } catch (error) {
    return { status: 404, message: 'not found' };
  }
}
async function createBarang(dataBarang) {
  if (!dataBarang.title || dataBarang.title.length == '') {
    return { status: 400, message: 'title harus diisi' };
  }
  if (!dataBarang.body) {
    return { status: 400, message: 'body harus diisi' };
  }
  const Barang = new Barang(dataBarang);
  await barang.save();
  return { data: dataBarang, status: 200 };
}
async function updateBarang(id, dataBarang) {
  if (!dataBarang.title || dataBarang.title.length == '') {
    return { status: 400, message: 'title harus diisi' };
  }
  if (!dataBarang.body) {
    return { status: 400, message: 'body harus diisi' };
  }
  await Barang.updateOne({ _id: id }, dataBarang);
  return { data: dataBarang, status: 200 };
}
async function deleteBarang(id) {
  await Barang.deleteOne({ _id: id });
  return { status: 204 };
}

module.exports = {
  fetchBarang,
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
};