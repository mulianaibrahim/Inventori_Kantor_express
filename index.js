const {server} = require('./server');

const app = server();

const PORT = process.env.APP_PORT;
app.listen(PORT);
console.log('application running on port', PORT);
