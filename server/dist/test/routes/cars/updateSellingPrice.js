'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

var _tokens = require('../../utils/tokens');

var _tokens2 = _interopRequireDefault(_tokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
var userToken = _tokens2.default.userToken,
    adminToken = _tokens2.default.adminToken;


var validId = 2;
var invalidId = 40;
var invalidDataType = 'jjjj';

describe('Car Routes: Update sale Ad price', function () {
  var normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'updatesellingprice@gmail.com',
    password: 'password100',
    confirmPassword: 'password100'
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
      (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('authorization', 'Bearer ' + userToken).send(carToGet).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        done();
      });
    });
  });
  it('should update price of the car.', function (done) {
    (0, _supertest2.default)(_app2.default).patch('/api/v1/car/5/price').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send({ price: 15000000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('should return error if the car is not found', function (done) {
    (0, _supertest2.default)(_app2.default)
    // eslint-disable-next-line no-irregular-whitespace
    .patch('/api/v1/car/' + invalidId + '/price').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send({ price: 1500000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(404);
      (0, _chai.expect)(res.body.error).to.equal('Not Found');

      done();
    });
  });

  it('should return error for unauthorized access', function (done) {
    (0, _supertest2.default)(_app2.default).patch('/api/v1/car/' + validId + '/price').set('Accept', 'application/json').set('authorization', '').send({ price: 15000000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.include.keys('error');
      (0, _chai.expect)(res.body.error).to.equal('Unauthorized user');

      done();
    });
  });

  it('should return error for if car id is not an integer', function (done) {
    (0, _supertest2.default)(_app2.default).patch('/api/v1/car/' + invalidDataType + '/price').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send({ price: 15000000 }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);

      done();
    });
  });
});