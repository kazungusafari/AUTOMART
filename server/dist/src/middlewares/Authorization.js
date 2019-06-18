'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @exports
 * @class Authorization
 */
var Authorization = function () {
  function Authorization() {
    _classCallCheck(this, Authorization);
  }

  _createClass(Authorization, null, [{
    key: 'getToken',

    /**
       * @method getToken
       * @memberof Authorization
       * @param {object} req
       * @returns {string} token
       */
    value: function getToken(req) {
      var bearerToken = req.headers.authorization;
      var token = bearerToken && bearerToken.replace('Bearer ', '');

      return token;
    }

    /**
       * @method generateToken
       * @memberof Authorization
       * @param {object} user
       * @returns {string} token
       * expires in 24 hours
       */

  }, {
    key: 'generateToken',
    value: function generateToken(_ref) {
      var user = _objectWithoutProperties(_ref, []);

      var token = _jsonwebtoken2.default.sign({ user: user }, process.env.SECRET, {
        expiresIn: 86400
      });

      return token;
    }

    // eslint-disable-next-line consistent-return

  }, {
    key: 'authenticate',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, decoded, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                token = Authorization.getToken(req);

                if (token) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(401).json({
                  status: 401,
                  error: 'Unauthorized user'
                }));

              case 4:
                _context.next = 6;
                return _jsonwebtoken2.default.verify(token, process.env.SECRET);

              case 6:
                decoded = _context.sent;
                user = _user2.default.findOne(decoded.user.email);

                if (user) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  status: 400,
                  message: 'Token is invalid'
                }));

              case 10:
                req.user = decoded.user;
                next();
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](0);

                if (!(_context.t0.name === 'TokenExpiredError')) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt('return', res.status(401).json({
                  status: 401,
                  error: 'Token Expired'
                }));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 14]]);
      }));

      function authenticate(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return authenticate;
    }()
  }]);

  return Authorization;
}();

exports.default = Authorization;