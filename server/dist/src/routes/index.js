'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _cars = require('./cars');

var _cars2 = _interopRequireDefault(_cars);

var _orders = require('./orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRoutes = _express2.default.Router();

apiRoutes.get('/', function (req, res) {
  return res.json({
    status: 200,
    message: 'Welcome to AutoMart API'
  });
});

apiRoutes.get('/v1', function (req, res) {
  return res.json({
    status: 200,
    message: 'Welcome to version 1 of AutoMart API'
  });
});

apiRoutes.use('/v1/auth', _users2.default);
apiRoutes.use('/v1/car', _cars2.default);
apiRoutes.use('/v1/order', _orders2.default);

exports.default = apiRoutes;