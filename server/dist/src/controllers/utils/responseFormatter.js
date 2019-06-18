'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @class Response
 */
var Response = function () {
  function Response() {
    _classCallCheck(this, Response);
  }

  _createClass(Response, null, [{
    key: 'customResponse',

    /**
       * Return a formatted object
       * @static
       * @param {Object} obj the car object
       * @param {object} res the HTTP response object
       * @param {string} message the descriptive message on operation
       * @returns { Object } Returns a formatted Object
       * @memberof Response
       */
    value: function customResponse(message, obj, res, httpCode) {
      var data = {};
      // eslint-disable-next-line no-return-assign
      Object.keys(obj).forEach(function (e) {
        if (e !== 'password' && e !== 'address') {
          data[e] = obj[e];
        }
      });

      return res.status(httpCode).json({
        message: message,
        status: res.statusCode,
        data: _extends({}, data)
      });
    }

    /**
     * @static
     * @method errorResponse
     * @memberof Response
     * @param {object} res the HTTP response object
     * @param {string} errorMsg user object
     * @param {integer} httpCode the HTTP status code
     * @return {object} return status code and error message
     */

  }, {
    key: 'errorResponse',
    value: function errorResponse(res, errorMsg, httpCode) {
      return res.status(httpCode).send({
        status: res.statusCode,
        error: errorMsg
      });
    }
  }]);

  return Response;
}();

exports.default = Response;