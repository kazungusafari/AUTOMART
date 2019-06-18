'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */


var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _mockData = require('../../utils/mockData');

var _mockData2 = _interopRequireDefault(_mockData);

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _mockData$login = _mockData2.default.login,
    noEmail = _mockData$login.noEmail,
    noPassword = _mockData$login.noPassword,
    invalidEmailFormat = _mockData$login.invalidEmailFormat,
    invalidPasswordFormat = _mockData$login.invalidPasswordFormat;


describe('Auth routes: login', function () {
  var normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'normal@gmail.com',
    password: 'password100',
    confirmPassword: 'password100'
  };
  var adminUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'admin@gmail.com',
    password: 'password100',
    confirmPassword: 'password100'
  };
  before(function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(_extends({}, normalUser)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(_extends({}, adminUser)).query({ admin: true }).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  it('should login a valid normal user', function (done) {
    var normalUser = {
      email: 'normal@gmail.com',
      password: 'password100'

    };
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(normalUser).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body.data).to.include.keys('firstname');
      (0, _chai.expect)(res.body.data).to.include.keys('lastname');
      (0, _chai.expect)(res.body.data).to.include.keys('email');
      (0, _chai.expect)(res.body.data).to.include.keys('is_admin');
      (0, _chai.expect)(res.body.data).to.include.keys('token');
      (0, _chai.expect)(res.body.data.is_admin).to.equal(false);

      done(err);
    });
  });

  it('should return login in an Admin User', function (done) {
    var adminUser = {
      email: 'admin@gmail.com',
      password: 'password100'

    };
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(adminUser).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body.data).to.include.keys('token');
      (0, _chai.expect)(res.body.data).to.include.keys('firstname');
      (0, _chai.expect)(res.body.data).to.include.keys('lastname');
      (0, _chai.expect)(res.body.data).to.include.keys('email');
      (0, _chai.expect)(res.body.data).to.include.keys('is_admin');
      (0, _chai.expect)(res.body.data.is_admin).to.equal(true);

      done(err);
    });
  });

  it('should return error of missing password field', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(_extends({}, noPassword)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);

      done(err);
    });
  });
  it('should return error of missing email field', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(_extends({}, noEmail)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);

      done(err);
    });
  });
  it('should return error for invalid email format', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(_extends({}, invalidEmailFormat)).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).to.include.keys('errors');

      done(err);
    });
  });
});

it('should return error for invalid password format', function (done) {
  (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(_extends({}, invalidPasswordFormat)).end(function (err, res) {
    (0, _chai.expect)(res.statusCode).to.equal(400);
    (0, _chai.expect)(res.body).to.include.keys('errors');

    done(err);
  });
});