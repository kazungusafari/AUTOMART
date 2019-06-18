'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */


var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _mockData = require('../../utils/mockData');

var _mockData2 = _interopRequireDefault(_mockData);

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _mockData$signup = _mockData2.default.signup,
    validUserDetails = _mockData$signup.validUserDetails,
    adminUserDetails = _mockData$signup.adminUserDetails,
    invalidUserDetails = _mockData$signup.invalidUserDetails;


describe('Auth routes: Signup', function () {
  it('should add a new user', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_extends({}, validUserDetails)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.a('object');

      done(err);
    });
  });

  it('should add a new Admin user', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_extends({}, adminUserDetails)).query({ admin: true }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body.data.is_admin).to.equal(true);

      done(err);
    });
  });

  it('should check if user already exists', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_extends({}, validUserDetails)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).to.include.keys('error');
      (0, _chai.expect)(res.body.error).to.equal('Email is already registered');

      done(err);
    });
  });

  it('should return errors for invalid fields', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_extends({}, invalidUserDetails)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.include.keys('errors');

      done(err);
    });
  });

  it('should return error of missing name field', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_extends({}, invalidUserDetails)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].param).to.equal('firstname');

      done(err);
    });
  });

  it('should return error for mismatch of password', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_extends({}, invalidUserDetails)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).to.include.keys('errors');

      done(err);
    });
  });
});