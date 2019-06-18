'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */


var _dotenv = require('dotenv');

var _order = require('../models/order');

var _order2 = _interopRequireDefault(_order);

var _car = require('../models/car');

var _car2 = _interopRequireDefault(_car);

var _responseFormatter = require('./utils/responseFormatter');

var _responseFormatter2 = _interopRequireDefault(_responseFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _dotenv.config)();

/**
 *
 * @class CarController
 */

var OrderController = function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, null, [{
    key: 'createOrder',

    /**
     * Create a purchase order.
     * @static
     * @param {object} req the HTTP request object
     * @param {object} res the HTTP response body
     * @returns { Object } the created purchase order
     * @memberof UserController
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var car, _ref2, rows, order, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                car = null;
                _context.next = 3;
                return _car2.default.findOneCar(req.body.carId);

              case 3:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                car = rows[0];

                if (!car) {
                  _context.next = 14;
                  break;
                }

                order = null;
                _context.next = 10;
                return _order2.default.create(req.user.id, req.body);

              case 10:
                response = _context.sent;

                order = response.rows[0];

                if (!order) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', _responseFormatter2.default.customResponse('Order created successfully', order, res, 201));

              case 14:
                return _context.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Car not found', 404));

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createOrder(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return createOrder;
    }()

    /**
       * Update the price of the order.
       * @static
       * @param {*} req the HTTP request object
       * @param {*} res the HTTP response object
       * @returns { Object } Returns the updated order Object
       * @memberof OrderController
       */

  }, {
    key: 'UpdatePrice',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var foundOrder, _ref4, rows, updatedOrder, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                foundOrder = null;
                _context2.next = 3;
                return _order2.default.findOneOrder(req.params.id);

              case 3:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                foundOrder = rows[0];

                if (!foundOrder) {
                  _context2.next = 15;
                  break;
                }

                if (!(foundOrder.owner === req.user.id && foundOrder.status === 'pending')) {
                  _context2.next = 14;
                  break;
                }

                updatedOrder = null;
                _context2.next = 11;
                return _order2.default.update(req.params.id, req.body.price);

              case 11:
                response = _context2.sent;

                updatedOrder = response.rows[0];
                return _context2.abrupt('return', _responseFormatter2.default.customResponse('Price updated successfully', updatedOrder, res, 200));

              case 14:
                return _context2.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Forbidden', 403));

              case 15:
                return _context2.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Order Not Found', 404));

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function UpdatePrice(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return UpdatePrice;
    }()
  }]);

  return OrderController;
}();

exports.default = OrderController;