'use strict';

var app = require('express')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var fs = require('fs');
var config = require('./config');
var cors = require('cors');
// var bodyParser = require('body-parser');

var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
};

var swaggerDoc = JSON.parse(fs.readFileSync('./api/swagger.json', 'utf8'));

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

// @see https://github.com/expressjs/body-parser#bodyparserjsonoptions
// @todo change the value if you need to handle the body size larger than 100kb.
//  app.use(bodyParser.json({
//    limit: '100kb',
//  }));

  app.use(cors());
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());

  http.createServer(app).listen(config.serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', config.serverPort, config.serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', config.serverPort);
  });
});
