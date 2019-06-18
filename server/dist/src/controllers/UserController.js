'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-undef-init */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */


var _dotenv = require('dotenv');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _address = require('../models/address');

var _address2 = _interopRequireDefault(_address);

var _Authorization = require('../middlewares/Authorization');

var _Authorization2 = _interopRequireDefault(_Authorization);

var _responseFormatter = require('./utils/responseFormatter');

var _responseFormatter2 = _interopRequireDefault(_responseFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _dotenv.config)();

/**
 *
 * @class UserController
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signup',

    /**
     * Create a new User
     * @static
     * @param {object} req the http request object
     * @param {object} res the http response object
     * @returns { Object } the created user object
     * @memberof UserController
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var registeredUser, _ref2, rows, token, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                registeredUser = null;
                _context.next = 4;
                return _user2.default.create(req.query.admin, req.body);

              case 4:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                registeredUser = rows[0];
                token = _Authorization2.default.generateToken(registeredUser);

                registeredUser.token = token;
                // eslint-disable-next-line no-unused-vars
                _context.next = 11;
                return _address2.default.create(registeredUser.id, req.body);

              case 11:
                response = _context.sent;
                return _context.abrupt('return', _responseFormatter2.default.customResponse('User registered successfully', registeredUser, res, 201));

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](0);

                if (!(_context.t0.routine === '_bt_check_unique')) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Email is already registered', 400));

              case 19:
                return _context.abrupt('return', _responseFormatter2.default.errorResponse(res, _context.t0, 400));

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 15]]);
      }));

      function signup(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return signup;
    }()

    /**
     * Logs in a user
     * @method login
     * @memberof UserController
     * @param {object} req the http request object
     * @param {object} res the http response object
     * @returns {object} user login object
     */

  }, {
    key: 'login',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, email, password, userFound, _ref4, rows, isPasswordValid, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                userFound = undefined;
                _context2.next = 4;
                return _user2.default.findOne(email);

              case 4:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                userFound = rows[0];

                if (!(userFound === undefined)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Email is not registered', 404));

              case 9:
                isPasswordValid = UserController.verifyPassword(password, userFound.password);

                if (isPasswordValid) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Password is wrong', 401));

              case 12:
                token = _Authorization2.default.generateToken(userFound);

                userFound.token = token;
                return _context2.abrupt('return', _responseFormatter2.default.customResponse('Successful user login', userFound, res, 200));

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return login;
    }()

    /**
     * @method verifyPassword
     * @memberof UserController
     * @param {string} password
     * @param {string} hash
     * @return {Promise} Promise of true or false
     */

  }, {
    key: 'verifyPassword',
    value: function verifyPassword(password, hash) {
      return _bcrypt2.default.compareSync(password, hash);
    }
  }]);

  return UserController;
}();

exports.default = UserController;