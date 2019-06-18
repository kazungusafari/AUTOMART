'use strict';

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerDefinition = {
  info: {
    title: 'AutoMart',
    version: '1.0.0',
    description: 'AutoMart is a marketplace where you can buy or sell cars'
  }
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: [__dirname + '/routes/users.js', __dirname + '/routes/cars.js', __dirname + '/routes/orders.js']
};

var swaggerSpec = swaggerJSDoc(options);
module.exports = function (app) {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};