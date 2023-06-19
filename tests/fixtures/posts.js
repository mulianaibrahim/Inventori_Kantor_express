const Post = require('../../src/model/posts');
const posts = [
  {
    _id: '6486ef6fdc1c04f730a2c1d0',
    title: 'test1',
    body: 'test1',
  },
  {
    _id: '6486ef78dc1c04f730a2c1d2',
    title: 'test2',
    body: 'test2',
  },
  {
    _id: '64871282407585f33503200c',
    title: 'test3',
    body: 'test3',
  },
  {
    _id: '64871289c0c87723dd4a18f0',
    title: 'test4',
    body: 'test4',
  },
];
async function insertManyPosts() {
  await Post.insertMany(posts);
}
async function deleteManyPosts() {
  await Post.deleteMany({});
}

module.exports = {
  posts,
  insertManyPosts,
  deleteManyPosts,
};