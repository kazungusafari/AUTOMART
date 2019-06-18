'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */


var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dotenv = require('dotenv');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dateTime = (0, _moment2.default)().format('YYYY-MM-DD h:m:s');

(0, _dotenv.config)();

var Order = function () {
  function Order() {
    _classCallCheck(this, Order);
  }

  _createClass(Order, [{
    key: 'create',

    /**
     * Create a new order in the database
     * @param {integer} userId id of the  user
     * @param {object} data the order details
     * @returns {object} order object
     */
    value: function create(userId, data) {
      var order = [userId, data.carId, data.price, data.offeredPrice, data.status, dateTime, null];

      var text = 'INSERT INTO\n      orders(owner, car_id, price,offered_price,status,created_date,modified_date)\n      VALUES ($1, $2, $3,$4,$5,$6,$7) returning *';

      var response = _index2.default.query(text, order);
      return response;
    }

    /**
     * Find an order in the database by id
     * @param {integer} id the id of the order
     * @returns {object} order object
     */

  }, {
    key: 'findOneOrder',
    value: function findOneOrder(id) {
      var text = 'SELECT * FROM orders WHERE id = $1';
      var response = _index2.default.query(text, [id]);
      return response;
    }

    /**
     * Update the buying price of the order
     * @param {integer} id id of the order
     * @param {integer} price new offered price
     * @returns {object} order object
     */

  }, {
    key: 'update',
    value: function update(id, price) {
      var updateQuery = 'UPDATE orders\n      SET price=$1, modified_date=$2 WHERE id=$3 returning *';
      var details = [price, dateTime, id];
      var response = _index2.default.query(updateQuery, details);
      return response;
    }
  }]);

  return Order;
}();

exports.default = new Order();