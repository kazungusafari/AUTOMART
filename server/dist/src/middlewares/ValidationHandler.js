'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require('express-validator/check');

var _filter = require('express-validator/filter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @exports
 * @class ValidationHandler
 */
var ValidationHandler = function () {
  function ValidationHandler() {
    _classCallCheck(this, ValidationHandler);
  }

  _createClass(ValidationHandler, null, [{
    key: 'validate',

    /**
       * Sends validation errors if existent, passes it on to the next middleware if not
       * @method validate
       * @memberof ValidationHandler
       * @param {object} req
       * @param {object} res
       * @param {function} next
       * @returns {(function|object)} Function next() or JSON object
       */
    value: function validate(req, res, next) {
      var errors = (0, _check.validationResult)(req);
      // eslint-disable-next-line no-param-reassign
      req = _extends({}, req, (0, _filter.matchedData)(req));

      if (!errors.isEmpty()) {
        var mappedErrors = errors.array();

        return res.status(400).json({
          status: 400,
          errors: mappedErrors
        });
      }

      return next();
    }
  }]);

  return ValidationHandler;
}();

exports.default = ValidationHandler;