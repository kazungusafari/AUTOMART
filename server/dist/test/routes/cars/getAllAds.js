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
var adminToken = _tokens2.default.adminToken,
    userToken = _tokens2.default.userToken;


describe('Car Routes: All cars', function () {
  var adminUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'jiji@gmail.com',
    password: 'password100',
    confirmPassword: 'password100'
  };
  var carToDelete = {
    state: 'used',
    status: 'available',
    price: 1550000,
    manufacturer: 'BMW',
    model: '1 series',
    bodyType: 'saloon'
  };
  before(function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(adminUser).query({ admin: true }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      var _res$body$data = res.body.data,
          token = _res$body$data.token,
          id = _res$body$data.id;

      (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('authorization', 'Bearer ' + token).send(carToDelete).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        done();
      });
    });
  });
  it('get all cars', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/car').set('Accept', 'application/json').set('authorization', 'Bearer ' + adminToken).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('should return error if user token is used', function (done) {
    (0, _supertest2.default)(_app2.default)
    // eslint-disable-next-line no-irregular-whitespace
    .get('/api/v1/car').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(403);
      (0, _chai.expect)(res.body.error).to.equal('Forbidden');
      done();
    });
  });

  it('should return error no token is provided', function (done) {
    (0, _supertest2.default)(_app2.default)
    // eslint-disable-next-line no-irregular-whitespace
    .get('/api/v1/car/').set('Accept', 'application/json').set('authorization', '').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Unauthorized user');
      done();
    });
  });
});