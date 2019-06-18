'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dotenv = require('dotenv');

var _hashPassword = require('../helpers/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dateTime = (0, _moment2.default)().format('YYYY-MM-DD h:m:s');
(0, _dotenv.config)();

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'create',

    /**
     * Create a new user in the database
     * @param {boolean} isUserAdmin show if user is admin or not
     * @param {object} userData the user data
     * @returns {object} user object
     */
    value: function create() {
      var isUserAdmin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var userData = arguments[1];

      var queryText = 'INSERT INTO\n        users(firstname, lastname, email, is_admin, password, created_date) \n        VALUES ($1, $2, $3, $4, $5, $6) returning *';
      var firstname = userData.firstname,
          lastname = userData.lastname,
          email = userData.email,
          password = userData.password;


      var newPassword = (0, _hashPassword2.default)(password, 10);
      var user = [firstname, lastname, email, isUserAdmin, newPassword, dateTime];
      var response = _index2.default.query(queryText, user);
      return response;
    }

    /**
     * Find user in the database by email
     * @param {string} email the user email
     * @returns {object} user object
     */

  }, {
    key: 'findOne',
    value: function findOne(email) {
      var query = 'SELECT * FROM users WHERE email=$1';
      var response = _index2.default.query(query, [email]);
      return response;
    }

    /**
     * Update user password in the database
     * @param {string} email the email of the user
     * @param {object} password the password of the user
     */

  }, {
    key: 'update',
    value: function update(email, password) {
      var newPassword = (0, _hashPassword2.default)(password, 10);
      var updateQuery = 'UPDATE users\n      SET password=$1, modified_date=$2 WHERE email=$3 returning *';
      var details = [newPassword, dateTime, email];
      var response = _index2.default.query(updateQuery, details);
      return response;
    }
  }]);

  return User;
}();

exports.default = new User();