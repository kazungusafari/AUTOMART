'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Authorization = require('../../src/middlewares/Authorization');

var _Authorization2 = _interopRequireDefault(_Authorization);

var _hashPassword = require('../../src/helpers/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateTime = (0, _moment2.default)().format('YYYY-MM-DD h:m:s');

var userToken = _Authorization2.default.generateToken({
  id: 3,
  firstname: 'John',
  lastname: 'Doe',
  email: 'example@gmail.com',
  address: {
    box_number: 100,
    postal_code: 11000,
    town: 'Nairobi'
  },
  is_admin: false,
  password: (0, _hashPassword2.default)('password100', 10),
  created_date: dateTime,
  modified_date: null
});
var adminToken = _Authorization2.default.generateToken({
  id: 2,
  firstname: 'John',
  lastname: 'Doe',
  email: 'admin@email.com',
  address: {
    box_number: 55,
    postal_code: 11025,
    town: 'Kisumu'
  },
  is_admin: true,
  password: (0, _hashPassword2.default)('password100', 10),
  created_date: dateTime,
  modified_date: null
});

var tokens = {
  adminToken: adminToken,
  userToken: userToken

};

exports.default = tokens;