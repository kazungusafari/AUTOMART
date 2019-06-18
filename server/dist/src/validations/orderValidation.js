'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _check = require('express-validator/check');

var _notEmpty = require('../helpers/notEmpty');

var _notEmpty2 = _interopRequireDefault(_notEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createOrder: [(0, _check.check)(['offeredPrice', 'price', 'status', 'carId']).trim().exists().withMessage('All fields are required').custom(function (value) {
    return (0, _notEmpty2.default)(value, 'All fields are required');
  }), (0, _check.check)(['offeredPrice', 'price', 'carId']).isInt().withMessage('Price and carId can only be in the form of integers'), (0, _check.check)('status').isString().withMessage('Status can only be of type string')],
  updateOrderPrice: [(0, _check.body)(['price']).exists().withMessage('price is required').custom(function (value) {
    return (0, _notEmpty2.default)(value, 'price is required');
  }).isInt().withMessage('Price can only be in the form of integers').toInt()]
};