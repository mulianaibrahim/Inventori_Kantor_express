const Post = require('../../model/posts');

async function fetchPosts() {
  const data = await Post.find({});
  return {
    data,
    status: 200
  };
}
async function getPost(id) {
  try {
    const response = await Post.findOne({
      _id: id
    });
    return {
      data: response,
      status: 200
    };
  } catch (error) {
    return {
      status: 404,
      message: 'not found'
    };
  }
}
async function createPost(postData) {
  if (!postData.title || postData.title.length == '') {
    return {
      status: 400,
      message: 'title harus diisi'
    };
  }
  if (!postData.body) {
    return {
      status: 400,
      message: 'body harus diisi'
    };
  }
  const post = new Post(postData);
  await post.save();
  return {
    data: postData,
    status: 200
  };
}
async function updatePost(id, postData) {
  if (!postData.title || postData.title.length == '') {
    return {
      status: 400,
      message: 'title harus diisi'
    };
  }
  if (!postData.body) {
    return {
      status: 400,
      message: 'body harus diisi'
    };
  }
  await Post.updateOne({
    _id: id
  }, postData);
  return {
    data: postData,
    status: 200
  };
}
async function deletePost(id) {
  await Post.deleteOne({
    _id: id
  });
  return {
    status: 204
  };
}

module.exports = {
  fetchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};