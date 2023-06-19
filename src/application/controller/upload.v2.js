const path = require('path');
const fs = require('fs');

function uploadGambar(req, res) {
  const metaData = req.file;
  const originalName = metaData.originalname;
  const oldPath = metaData.path;
  fs.renameSync(oldPath, path.resolve(`public/images/${originalName}`));
  res.send({ message: 'ngirim gambar nih' });
}

module.exports = {
  uploadGambar,
};
