const {
  fetchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../domain/post.domain');

async function getPosts(req, res) {
  const data = await fetchPosts();
  res.send(data.data);
}
async function getOnePost(req, res) {
  const id = req.params.id;
  const response = await getPost(id);
  res.status(response.status).send(response.data || response);
}
async function addPosts(req, res) {
  const postData = {
    title: req.body.title,
    body: req.body.body,
  };
  const response = await createPost(postData);
  res.status(response.status).send(response.data || response);
}
async function updateOne(req, res) {
  const id = req.params.id;
  const postData = {
    title: req.body.title,
    body: req.body.body,
  };
  const response = await updatePost(id, postData);
  res.status(response.status).send(response.data || response);
}
async function deleteOne(req, res) {
  const id = req.params.id;
  const response = await deletePost(id);
  res.status(response.status).send();
}

module.exports = {
  getPosts,
  addPosts,
  getOnePost,
  updateOne,
  deleteOne,
};