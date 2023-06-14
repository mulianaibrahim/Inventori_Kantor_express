const {server} = require('./server');

const app = server();

const PORT = 3000;
app.listen(PORT);
console.log('application running on port', PORT);
