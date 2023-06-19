const Mhs = require('../../model/mahasiswa');

async function getMhs(req, res) {
    try {
        const data = await Mhs.find({});
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getOneMhs(req, res) {
  const id = req.params.id;
  try {
      const data = await Mhs.findById(id);
      res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addMhs(req, res) {
  const MhsData = {
    nama: req.body.nama,
    nim: req.body.nim,
    kelas: req.body.kelas,
    jenisKelamin: req.body.jenisKelamin,
  };
  const mhs = new Mhs(MhsData);
  try {
      const response = await mhs.save();
      res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}


async function updateOne(req, res){
  const id = req.params.id;
  const mhsData = {
    nama: req.body.nama,
    nim: req.body.nim,
    kelas: req.body.kelas,
    jenisKelamin: req.body.jenisKelamin,
  };
  try {
      const response = await Mhs.findByIdAndUpdate(id, mhsData);
      res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteOne(req, res){
  const id = req.params.id;
  try {
      const response = await Mhs.findByIdAndDelete(id);
      res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  getMhs,
  getOneMhs,
  addMhs,
  updateOne,
  deleteOne,
};
