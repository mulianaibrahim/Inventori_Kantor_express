const User = require('../../src/model/users');
async function deleteUser() {
  await User.deleteMany({});
}

module.exports = {
  deleteUser,
};