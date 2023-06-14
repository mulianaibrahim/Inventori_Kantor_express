const express = require('express');
const bodyParser = require('body-parser');;
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const routerv1 = require('./src/application/v1.routes');
const db = require('./src/database');


function server (){
    db.connect().catch(console.log);
    const app = express();
      
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      
      const swaggerDocument = yaml.load(fs.readFileSync('./src/swagger/swagger.yaml', 'utf-8'))
      
      app.get('/', function (req, res) {
        res.send({ message: 'hello world!' });
      });

      app.use('/api/v1', routerv1);
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      
      app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(500).send({ message: 'terjadi kesalahan! :(' });
      });
      return app;
}

module.exports = {server};