const Mk = require('../../model/mataKuliah');

async function getMk(req, res) {
    try {
        const data = await Mk.find({});
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getOneMk(req, res) {
  const id = req.params.id;
  try {
      const data = await Mk.findById(id);
      res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addMk(req, res) {
  const MkData = {
    kode: req.body.kode, 
    nama: req.body.nama, 
    sks: req.body.sks, 
    kelas: req.body.kelas,
  };
  const mk = new Mk(MkData);
  try {
      const response = await mk.save();
      res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}


async function updateOne(req, res){
  const id = req.params.id;
  const MkData = {
    kode: req.body.kode, 
    nama: req.body.nama, 
    sks: req.body.sks, 
    kelas: req.body.kelas,
  };
  try {
      const response = await Mk.findByIdAndUpdate(id, MkData);
      res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteOne(req, res){
    const id = req.params.id;
    try {
        const response = await Mk.findByIdAndDelete(id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
  getMk,
  getOneMk,
  addMk,
  updateOne,
  deleteOne,
};
