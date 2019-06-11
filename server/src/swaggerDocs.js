const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'AutoMart',
    version: '1.0.0',
    description: 'AutoMart is a marketplace where you can buy or sell cars',
  },
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/routes/users.js`, `${__dirname}/routes/cars.js`, `${__dirname}/routes/orders.js`],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = (app) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
