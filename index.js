const {server} = require('./server');

const app = server();


const PORT = 3000;
const end = process.env.APP_PORT;
if(Boolean(end)){
    app.listen(end);
    console.log('application running on port', end);
}else{
    app.listen(PORT);
    console.log('application running on port', PORT);
}
