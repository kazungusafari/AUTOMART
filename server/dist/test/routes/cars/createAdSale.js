'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-unused-vars */
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

var userToken = _tokens2.default.userToken,
    adminToken = _tokens2.default.adminToken;
var _mockData$createSaleA = _mockData2.default.createSaleAd,
    validSaleAd1 = _mockData$createSaleA.validSaleAd1,
    validSaleAd2 = _mockData$createSaleA.validSaleAd2,
    validSaleAd3 = _mockData$createSaleA.validSaleAd3,
    validSaleAd4 = _mockData$createSaleA.validSaleAd4,
    invalidCarPriceFormat = _mockData$createSaleA.invalidCarPriceFormat,
    invalidCarStateFormat = _mockData$createSaleA.invalidCarStateFormat,
    missingCarBodyType = _mockData$createSaleA.missingCarBodyType,
    missingCarPrice = _mockData$createSaleA.missingCarPrice,
    missingCarStatus = _mockData$createSaleA.missingCarStatus,
    missingCarState = _mockData$createSaleA.missingCarState;


describe('Car Routes: create a new a sale Ad', function () {
  it('should return errors for unauthorized access', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('Accept', 'application/json').set('authorization', '').send(_extends({}, validSaleAd1)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.include.keys('error');
      (0, _chai.expect)(res.body.error).to.equal('Unauthorized user');

      done();
    });
  });
  it('should return errors missing car price', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, missingCarPrice)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields are required');

      done();
    });
  });
  it('should return errors for invalid car price format', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, invalidCarPriceFormat)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].param).to.equal('price');
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('Price can only be in the form of integers');

      done();
    });
  });
  it('should return errors for invalid car state format', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, invalidCarStateFormat)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].param).to.equal('state');
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields except price are suppose to be strings');

      done();
    });
  });
  it('should return errors missing car body type', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, missingCarBodyType)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].param).to.equal('bodyType');
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields are required');

      done();
    });
  });
  it('should return errors missing car state', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, missingCarState)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].param).to.equal('state');
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields are required');

      done();
    });
  });
  it('should return errors missing status', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).send(_extends({}, missingCarStatus)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].param).to.equal('status');
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('All fields are required');

      done();
    });
  });
});