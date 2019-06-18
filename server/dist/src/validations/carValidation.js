'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _check = require('express-validator/check');

var _notEmpty = require('../helpers/notEmpty');

var _notEmpty2 = _interopRequireDefault(_notEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createSaleAd: [(0, _check.check)(['manufacturer', 'price', 'state', 'status', 'model', 'bodyType']).trim().exists().withMessage('All fields are required').custom(function (value) {
    return (0, _notEmpty2.default)(value, 'All fields are required');
  }), (0, _check.check)(['manufacturer', 'state', 'status', 'model', 'bodyType']).isString().withMessage('All fields except price are suppose to be strings'), (0, _check.check)('price').isInt().withMessage('Price can only be in the form of integers')]
};