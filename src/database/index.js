const mongoose = require('mongoose');

const DB_HOST = '127.0.0.1';
const DB_PORT = 27017;
const DB_NAME = 'bootcamp';

async function connect() {
  await mongoose.connect(
    `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
  );

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function () {
    console.log('connected to mongodb');
  });
}

async function disconnect(){
  await mongoose.disconnect();
}

module.exports = { connect, disconnect };
