'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */


var _dotenv = require('dotenv');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

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

var CarController = function () {
  function CarController() {
    _classCallCheck(this, CarController);
  }

  _createClass(CarController, null, [{
    key: 'createSaleAd',

    /**
     * Create a new sale AD
     * @static
     * @param {object} req the http request object
     * @param {object} res the http response object
     * @returns { Object } the posted sale Ad object
     * @memberof UserController
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user, _ref2, rows, saleAd, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = null;
                _context.next = 3;
                return _user2.default.findOne(req.user.email);

              case 3:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                user = rows[0];

                if (!(user !== null)) {
                  _context.next = 14;
                  break;
                }

                saleAd = null;
                _context.next = 10;
                return _car2.default.create(req.user.id, req.body);

              case 10:
                response = _context.sent;

                saleAd = response.rows[0];

                if (!(saleAd !== null)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', _responseFormatter2.default.customResponse('Sale Ad created successfully', saleAd, res, 201));

              case 14:
                return _context.abrupt('return', _responseFormatter2.default.errorResponse(res, 'User is not registered', 404));

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createSaleAd(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return createSaleAd;
    }()

    /**
       * Get a car sale Ad by id
       * @static
       * @param {*} req the http request object
       * @param {*} res the http response object
       * @returns { Object } Returns a sale Ad object
       * @memberof CarController
     */

  }, {
    key: 'getSaleAdById',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var saleAd, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                saleAd = null;
                _context2.next = 3;
                return _car2.default.findOneCar(req.params.id);

              case 3:
                response = _context2.sent;

                saleAd = response.rows[0];

                if (!saleAd) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', _responseFormatter2.default.customResponse('Sale Ad found successfully', saleAd, res, 200));

              case 7:
                return _context2.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Sale Ad Not Found', 404));

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSaleAdById(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getSaleAdById;
    }()

    /**
       * Get all unsold car Ads
       * @static
       * @param {*} req the http request object
       * @param {*} res the http response object
       * @returns { Array } Returns an array of Objects
       * @memberof CarController
       */

  }, {
    key: 'getAllSaleAds',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var queryLength, _req$query, max_price, min_price, status, _ref5, rows, allUnsoldByPriceRange, response;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // eslint-disable-next-line radix
                queryLength = parseInt(Object.keys(req.query).length);
                // eslint-disable-next-line camelcase

                _req$query = req.query, max_price = _req$query.max_price, min_price = _req$query.min_price, status = _req$query.status;

                if (!(queryLength === 0)) {
                  _context3.next = 6;
                  break;
                }

                if (!(req.user.is_admin === true)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return', CarController.getAllCars(res));

              case 5:
                return _context3.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Forbidden', 403));

              case 6:
                if (!(queryLength === 1 && status)) {
                  _context3.next = 14;
                  break;
                }

                if (!(req.query.status === 'available')) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 10;
                return _car2.default.findAllByStatus(req.query.status);

              case 10:
                _ref5 = _context3.sent;
                rows = _ref5.rows;
                return _context3.abrupt('return', CarController.response(rows, res));

              case 13:
                return _context3.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Forbidden', 403));

              case 14:
                if (!(queryLength === 3 && min_price && max_price && status)) {
                  _context3.next = 22;
                  break;
                }

                allUnsoldByPriceRange = null;
                _context3.next = 18;
                return _car2.default.findAllByPriceRange(min_price, max_price, status);

              case 18:
                response = _context3.sent;

                allUnsoldByPriceRange = response.rows;

                if (!(allUnsoldByPriceRange !== null)) {
                  _context3.next = 22;
                  break;
                }

                return _context3.abrupt('return', CarController.response(allUnsoldByPriceRange, res));

              case 22:
                return _context3.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Not Found', 404));

              case 23:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAllSaleAds(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return getAllSaleAds;
    }()

    /**
       * Mark posted car as sold
       * @static
       * @param {*} req
       * @param {*} res
       * @returns { Object } Returns the updated car Object
       * @memberof CarController
       */

  }, {
    key: 'markAdAsSold',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var car, _ref7, rows, updatedCar, response;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                car = null;
                _context4.next = 3;
                return _car2.default.findOneCar(req.params.id);

              case 3:
                _ref7 = _context4.sent;
                rows = _ref7.rows;

                car = rows[0];

                if (!car) {
                  _context4.next = 15;
                  break;
                }

                if (!(car.owner === req.user.id)) {
                  _context4.next = 14;
                  break;
                }

                updatedCar = null;
                _context4.next = 11;
                return _car2.default.updateStatus(req.params.id);

              case 11:
                response = _context4.sent;

                updatedCar = response.rows[0];
                return _context4.abrupt('return', _responseFormatter2.default.customResponse('Status updated successfully', updatedCar, res, 200));

              case 14:
                return _context4.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Unauthorised User', 401));

              case 15:
                return _context4.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Not Found', 404));

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function markAdAsSold(_x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return markAdAsSold;
    }()

    /**
       * Return all posted ads whether sold or available.
       * @static
       * @param {*} req the http request object
       * @param {*} res the http response object
       * @returns { Array } Returns an array of all posted ads
       * @memberof CarController
       */

  }, {
    key: 'getAllCars',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(res) {
        var _ref9, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _car2.default.findAll();

              case 3:
                _ref9 = _context5.sent;
                rows = _ref9.rows;
                return _context5.abrupt('return', CarController.response(rows, res));

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](0);
                return _context5.abrupt('return', _responseFormatter2.default.errorResponse(res, _context5.t0, 400));

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function getAllCars(_x9) {
        return _ref8.apply(this, arguments);
      }

      return getAllCars;
    }()

    /**
       * Update the price of a car.
       * @static
       * @param {*} req the http request object
       * @param {*} res the http response object
       * @returns { Object } Returns the updated car Object
       * @memberof CarController
       */

  }, {
    key: 'UpdatePrice',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var car, _ref11, rows, updatedCar, response;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                car = null;
                _context6.next = 3;
                return _car2.default.findOneCar(req.params.id);

              case 3:
                _ref11 = _context6.sent;
                rows = _ref11.rows;

                car = rows[0];

                if (!car) {
                  _context6.next = 16;
                  break;
                }

                if (!(car.owner === req.user.id)) {
                  _context6.next = 15;
                  break;
                }

                updatedCar = null;
                _context6.next = 11;
                return _car2.default.updateSellingPrice(req.params.id, req.body.price);

              case 11:
                response = _context6.sent;

                updatedCar = response.rows[0];

                if (!(updatedCar !== null)) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt('return', _responseFormatter2.default.customResponse('Price updated successfully', updatedCar, res, 200));

              case 15:
                return _context6.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Unauthorised User', 401));

              case 16:
                return _context6.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Not Found', 404));

              case 17:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function UpdatePrice(_x10, _x11) {
        return _ref10.apply(this, arguments);
      }

      return UpdatePrice;
    }()

    /**
       * Delete a specific car Ad
       * @static
       * @param {*} req the http request object
       * @param {*} res the http response object
       * @memberof CarController
     */

  }, {
    key: 'deleteSaleAdById',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var deletedCar, _ref13, rows;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(req.user.is_admin === true)) {
                  _context7.next = 10;
                  break;
                }

                deletedCar = null;
                _context7.next = 4;
                return _car2.default.delete(req.params.id);

              case 4:
                _ref13 = _context7.sent;
                rows = _ref13.rows;

                deletedCar = rows[0];

                if (!deletedCar) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt('return', res.status(200).json({
                  status: res.statusCode,
                  data: 'Car Ad successfully deleted'
                }));

              case 9:
                return _context7.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Sale Ad Not Found', 404));

              case 10:
                return _context7.abrupt('return', _responseFormatter2.default.errorResponse(res, 'Forbidden', 403));

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteSaleAdById(_x12, _x13) {
        return _ref12.apply(this, arguments);
      }

      return deleteSaleAdById;
    }()

    /**
       * Return a custom response
       * @static
       * @param {*} res the HTTP response object
       * @returns { Array } Returns an array of Objects
       * @memberof CarController
       */

  }, {
    key: 'response',
    value: function response(arr, res) {
      if (arr.length > 0) {
        return res.status(200).json({
          message: 'Ads successfully found',
          status: res.statusCode,
          data: arr
        });
      }
      return _responseFormatter2.default.errorResponse(res, 'Not Found', 404);
    }
  }]);

  return CarController;
}();

exports.default = CarController;