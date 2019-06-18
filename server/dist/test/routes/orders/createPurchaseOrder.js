'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */


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

// eslint-disable-next-line no-unused-vars
var userToken = _tokens2.default.userToken,
    adminToken = _tokens2.default.adminToken;

// eslint-disable-next-line max-len
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJLYXp1bmd1IiwibGFzdG5hbWUiOiJTYWZhcmkiLCJlbWFpbCI6ImthenVuZ3Uuc2FmYXJpQGdtYWlsLmNvbSIsImFkZHJlc3MiOnsiYm94TnVtYmVyIjo2NiwicG9zdGFsQ29kZSI6MTAxMDEsInRvd24iOiJOYWlyb2JpIn0sImlzQWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6IiQyYiQxMCRvLmRxUHhQdmJHQ24wTnk2R3Jsbi8uR3hnbjlwbzdIVXMzLzVmQVhVeGRLS0dwZ2JsYUdrLiJ9LCJpYXQiOjE1NTkxMDgyMDYsImV4cCI6MTU1OTE5NDYwNn0.CpBjTCdwJjnKmy7frSjqef9sJlhzvLZasla4aT2rN2E';

var _mockData$createOrder = _mockData2.default.createOrder,
    validOrder = _mockData$createOrder.validOrder,
    missingCarPrice = _mockData$createOrder.missingCarPrice,
    missingCarStatus = _mockData$createOrder.missingCarStatus,
    missingCarId = _mockData$createOrder.missingCarId,
    wrongCarId = _mockData$createOrder.wrongCarId;


describe('Orders Routes: Create purchase order', function () {
  var normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'updateorderee@gmail.com',
    password: 'password100',
    confirmPassword: 'password100'
  };
  var carToOrder = {
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
      done();
    });
  });
  it('should create a new purchase order', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/order/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, validOrder)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.a('object');

      done();
    });
  });

  it('should return errors for unauthorized access', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/order/').set('Accept', 'application/json').set('authorization', '').send(_extends({}, validOrder)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.include.keys('error');
      (0, _chai.expect)(res.body.error).to.equal('Unauthorized user');

      done();
    });
  });
  it('should return errors missing car price', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/order/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, missingCarPrice)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields are required');

      done();
    });
  });

  it('should return errors if invalid car id is provided', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/order/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, wrongCarId)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(404);
      (0, _chai.expect)(res.body.error).to.equal('Car not found');

      done();
    });
  });
  it('should return errors if  car id is missing', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/order/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, missingCarId)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields are required');

      done();
    });
  });
  it('should return errors missing status', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/order/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, missingCarStatus)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields are required');

      done();
    });
  });
});