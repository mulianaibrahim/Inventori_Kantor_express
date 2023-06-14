const {
  fetchBarang,
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang
} = require('../logic/barang/barang.logic');

async function getAllBarang(req, res) {
  const data = await fetchBarang();
  res.send(data.data);
}
async function getOneBarang(req, res) {
  const id = req.params.id;
  const response = await getBarang(id);
  res.status(response.status).send(response.data || response);
}
async function addBarang(req, res) {
  const postData = {
    title: req.body.title,
    body: req.body.body,
  };
  const response = await createBarang(postData);
  res.status(response.status).send(response.data || response);
}
async function updateOneBarang(req, res) {
  const id = req.params.id;
  const postData = {
    title: req.body.title,
    body: req.body.body,
  };
  const response = await updateBarang(id, postData);
  res.status(response.status).send(response.data || response);
}
async function deleteOneBarang(req, res) {
  const id = req.params.id;
  const response = await deleteBarang(id);
  res.status(response.status).send();
}

module.exports =  {
  getAllBarang,
  getOneBarang,
  addBarang,
  updateOneBarang,
  deleteOneBarang,
};