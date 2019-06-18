'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */
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

var Car = function () {
  function Car() {
    _classCallCheck(this, Car);
  }

  _createClass(Car, [{
    key: 'create',

    /**
     * Create a new car sale ad in the database
     * @param {integer} userId the id of the user posting sale Ad
     * @param {object} data the sale Ad details
     * @returns {object} car object
     */
    value: function create(userId, data) {
      var car = [userId, dateTime, data.state, data.status, data.price, data.manufacturer, data.model, data.bodyType, null];

      var text = 'INSERT INTO\n        cars(owner, created_date, state,status,price,manufacturer,model,body_type,modified_date)\n        VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) returning *';

      var response = _index2.default.query(text, car);
      return response;
    }

    /**
     * Get a specific sale ad in the database by id
     * @param {integer} id the id of the car to find
     * @returns {object} car object
     */

  }, {
    key: 'findOneCar',
    value: function findOneCar(id) {
      var text = 'SELECT * FROM cars WHERE id = $1';
      var response = _index2.default.query(text, [id]);
      return response;
    }

    /**
     * Return all sale ads in the database
     * @returns { Array } returns all cars
     */

  }, {
    key: 'findAll',
    value: function findAll() {
      var findAllQuery = 'SELECT * FROM cars';
      var response = _index2.default.query(findAllQuery);
      return response;
    }

    /**
     * Get all sale ads in the database of a given status
     * @param {string} status the car status
     * @returns {Array} returns an array of all unsold cars
     */

  }, {
    key: 'findAllByStatus',
    value: function findAllByStatus(status) {
      var text = 'SELECT * FROM cars WHERE status = $1';
      var response = _index2.default.query(text, [status]);
      return response;
    }

    /**
     * Get all sale ads in the database within a given price range
     * @param {integer} minPrice the minimum price of the car
     * @param {integer} maxPrice the maximum price of the car
     * @param {string} status the status of the car
     * @returns {array} returns all unsold cars within a given price range
     */

  }, {
    key: 'findAllByPriceRange',
    value: function findAllByPriceRange(minPrice, maxPrice, status) {
      var details = [status, minPrice, maxPrice];
      var text = 'SELECT * FROM cars WHERE status = $1 AND price BETWEEN $2 AND $3 ';
      var response = _index2.default.query(text, details);
      return response;
    }

    /**
     * Update status of a sale ad in the database
     * @param {integer} id the id of the car
     * @returns {object} car object
     */

  }, {
    key: 'updateStatus',
    value: function updateStatus(id) {
      var updateQuery = 'UPDATE cars\n    SET status=$1, modified_date=$2 WHERE id=$3 returning *';
      var details = ['sold', dateTime, id];
      var response = _index2.default.query(updateQuery, details);
      return response;
    }

    /**
     * Update the selling price of a sale ad in the database
     * @param {integer} id id of the car
     * @param {integer} price new selling price
     * @returns {object} car object
     */

  }, {
    key: 'updateSellingPrice',
    value: function updateSellingPrice(id, price) {
      var updateQuery = 'UPDATE cars\n    SET price=$1, modified_date=$2 WHERE id=$3 returning *';
      var details = [price, dateTime, id];
      var response = _index2.default.query(updateQuery, details);
      return response;
    }

    /**
     * Delete a sale ad in the database
     * @param {integer} id id of the car
     * @returns {Object} return deleted car object
     */

  }, {
    key: 'delete',
    value: function _delete(id) {
      var deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
      var response = _index2.default.query(deleteQuery, [id]);
      return response;
    }
  }]);

  return Car;
}();

exports.default = new Car();