'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _mockData = require('../../utils/mockData');

var _mockData2 = _interopRequireDefault(_mockData);

var _tokens = require('../../utils/tokens');

var _tokens2 = _interopRequireDefault(_tokens);

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userToken = _tokens2.default.userToken,
    adminToken = _tokens2.default.adminToken; /* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

var acceptedOrder = 5;
var validId = 1;
var invalidId = 40;
var invalidDataType = 'jjjj';

describe('Order Routes: Update purchase order price ', function () {
  var normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'orderpriceUpdate@gmail.com',
    password: 'password100',
    confirmPassword: 'password100'
  };
  var orderToGet = {
    carId: 6,
    status: 'pending',
    price: 1550000,
    offeredPrice: 5000000,
    owner: 2

  };
  var carToGet = {
    state: 'used',
    status: 'available',
    price: 1550000,
    manufacturer: 'BMW',
    model: '1 series',
    bodyType: 'saloon'
  };
  before(function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(normalUser).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      var token = res.body.data.token;

      (0, _supertest2.default)(_app2.default).post('/api/v1/car').set('authorization', 'Bearer ' + token).send(carToGet).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        (0, _supertest2.default)(_app2.default).post('/api/v1/order').set('authorization', 'Bearer ' + userToken).send(orderToGet).end(function (err, res) {
          (0, _chai.expect)(res.statusCode).to.equal(201);
          done();
        });
      });
    });
  });
  it('should update purchase order price.', function (done) {
    (0, _supertest2.default)(_app2.default).patch('/api/v1/order/2/price').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send({ price: 15000000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('should return error if the purchase order is not found', function (done) {
    (0, _supertest2.default)(_app2.default)
    // eslint-disable-next-line no-irregular-whitespace
    .patch('/api/v1/order/' + invalidId + '/price').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send({ price: 1500000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(404);
      (0, _chai.expect)(res.body.error).to.equal('Order Not Found');
      done();
    });
  });

  it('should return error for unauthorized access', function (done) {
    (0, _supertest2.default)(_app2.default).patch('/api/v1/order/' + validId + '/price').set('Accept', 'application/json').set('authorization', '').send({ price: 15000000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.include.keys('error');
      (0, _chai.expect)(res.body.error).to.equal('Unauthorized user');
      done();
    });
  });

  it('should return error for if order id is not an integer', function (done) {
    (0, _supertest2.default)(_app2.default).patch('/api/v1/order/' + invalidDataType + '/price').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send({ price: 15000000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      done();
    });
  });

  it('should return error  if wrong owner  try to update purchase order price', function (done) {
    (0, _supertest2.default)(_app2.default).patch('/api/v1/order/' + validId + '/price').set('Accept', 'application/json').set('authorization', 'Bearer ' + adminToken).send({ price: 15000000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(403);
      (0, _chai.expect)(res.body.error).to.equal('Forbidden');
      done();
    });
  });
});