'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _check = require('express-validator/check');

var _notEmpty = require('../helpers/notEmpty');

var _notEmpty2 = _interopRequireDefault(_notEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkMultipleLocations = (0, _check.buildCheckFunction)(['query', 'body', 'params']);

exports.default = {

  verifyId: [checkMultipleLocations(['id']).exists().withMessage('Id is required').custom(function (value) {
    return (0, _notEmpty2.default)(value, 'Id is required');
  }).isInt().withMessage('Id can only be in the form of integers').toInt()]
};