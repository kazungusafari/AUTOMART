'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _check = require('express-validator/check');

var _notEmpty = require('../helpers/notEmpty');

var _notEmpty2 = _interopRequireDefault(_notEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  signup: [(0, _check.check)(['firstname', 'lastname', 'email', 'address', 'password', 'confirmPassword']).trim().exists().withMessage('All fields are required').custom(function (value) {
    return (0, _notEmpty2.default)(value, 'All fields are required');
  }), (0, _check.check)(['lastname', 'firstname']).isString().withMessage('Firstname and lastname must be a string').isAlpha().withMessage('Only letters are allowed as names').isLength({ min: 3 }).withMessage('Firstname and lastname must be minimum of 3 characters'), (0, _check.check)('email').isEmail().withMessage('Please input a valid email address'), (0, _check.check)('address').custom(function (value, _ref) {
    var req = _ref.req;

    if (req.body) {
      var addressArray = req.body.address.split(',');

      var _addressArray = _slicedToArray(addressArray, 3),
          boxNumber = _addressArray[0],
          postalCode = _addressArray[1],
          town = _addressArray[2];

      if (addressArray.length === 1) {
        throw new Error('Your address must have box number,postal code and town details separated by comma');
      } else if (addressArray.length === 2) {
        throw new Error('Your address must have box number,postal code and town details separated by comma');
      } else {
        req.body.boxNumber = parseInt(boxNumber, 10);
        req.body.postalCode = parseInt(postalCode, 10);
        req.body.town = town;
        return true;
      }
    } else {
      throw new Error('Address field is required');
    }
  }), (0, _check.check)('password').isLength({ min: 6 }).withMessage('Password must be minimum of 6 characters').matches(/\d/).withMessage('Password must contain a number'), (0, _check.check)('confirmPassword', 'Passwords don\'t match').custom(function (value, _ref2) {
    var req = _ref2.req;
    return value === req.body.password;
  })],
  changeToBoolean: [(0, _check.check)('admin').toBoolean()],

  login: [(0, _check.check)('email').trim().exists().withMessage('Email must be specified').custom(function (value) {
    return (0, _notEmpty2.default)(value, 'email field cannot be left blank');
  }).isEmail().withMessage('Please input a valid email address'), (0, _check.check)('password').trim().exists().withMessage('Password must be specified').isLength({ min: 6 }).withMessage('Password must be minimum of 6 characters').matches(/\d/).withMessage('Password must contain a number').custom(function (value) {
    return (0, _notEmpty2.default)(value, 'Password field cannot be left blank');
  })]
};