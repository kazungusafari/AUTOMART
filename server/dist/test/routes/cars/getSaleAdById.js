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
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
var userToken = _tokens2.default.userToken;


var validID = 5;
var invalidID = 30;

describe('Get a specific sale Ad:', function () {
  var normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'gugu@gmail.com',
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
      var token = res.body.data.token;

      (0, _supertest2.default)(_app2.default).post('/api/v1/car/').set('authorization', 'Bearer ' + token).send(carToGet).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        done();
      });
    });
  });
  it('should get a car sale Ad by a valid ID', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/car/2').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + userToken).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.include.keys('data');
      done(err);
    });
  });

  it('should return errors for invalid ID', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/car/45').set('authorization', 'Bearer ' + userToken).set('Content-Type', 'application/json').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(404);
      (0, _chai.expect)(res.body.error).to.equal('Sale Ad Not Found');
      done(err);
    });
  });
  it('should return errors for invalid ID', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/car/hhhh').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + userToken).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.errors[0].param).to.equal('id');
      (0, _chai.expect)(res.body.errors[0].msg).to.equal('Id can only be in the form of integers');

      done(err);
    });
  });
});