'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dotenv = require('dotenv');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dateTime = (0, _moment2.default)().format('YYYY-MM-DD h:m:s');

(0, _dotenv.config)();

var Address = function () {
  function Address() {
    _classCallCheck(this, Address);
  }

  _createClass(Address, [{
    key: 'create',

    /**
     * Create a new user address in the database
     * @param {object} userId the id of the new user
     * @param {object} addressData the address object
     * @returns {object} address object
     */
    value: function create(userId, addressData) {
      var queryText = 'INSERT INTO\n        addresses(box_number, postal_code, town,used_by, created_date) \n        VALUES ($1, $2, $3, $4, $5) returning *';
      var boxNumber = addressData.boxNumber,
          postalCode = addressData.postalCode,
          town = addressData.town;

      var address = [boxNumber, postalCode, town, userId, dateTime];
      var response = _index2.default.query(queryText, address);
      return response;
    }
  }]);

  return Address;
}();

exports.default = new Address();