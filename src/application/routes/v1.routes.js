const express = require('express');
const app = express.Router();

const barangCtrl = require('../controller/post');

//post
app.get('/posts', barangCtrl.getPosts);
app.get('/posts/:id', barangCtrl.getOnePost);
app.post('/posts', barangCtrl.addPosts);
app.put('/posts/:id', barangCtrl.updateOne);
app.delete('/posts/:id', barangCtrl.deleteOne);

module.exports = app;
