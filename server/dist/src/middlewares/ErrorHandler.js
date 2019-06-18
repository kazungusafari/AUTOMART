"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @exports
 * @class ErrorHandler
 */
var ErrorHandler = function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);
  }

  _createClass(ErrorHandler, null, [{
    key: "sendError",

    /**
       * Handlers uncaught erros in the app
       * @method sendError
       * @memberof ErrorHandler
       * @param {object} err
       * @param {object} req
       * @param {object} res
       * @param {function} next
       * @returns {(function|object)} Function next() or JSON object
       * Gotten from Express Documentation
       */
    value: function sendError(err, req, res, next) {
      if (res.headersSent) {
        return next(err);
      }

      return res.status(err.status || 500).send(err.message);
    }
  }]);

  return ErrorHandler;
}();

exports.default = ErrorHandler;