'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function hashPassword
 * @memberof UserController
 * @param {string} password
 * @param {integer} salt
 * @returns
 */
var hashPassword = function hashPassword(password, salt) {
  var hash = _bcrypt2.default.hashSync(password, salt);
  return hash;
};

exports.default = hashPassword;