'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

var _tokens = require('../../utils/tokens');

var _tokens2 = _interopRequireDefault(_tokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
var validID = 2;
// eslint-disable-next-line no-unused-vars
var invalidID = 30;

// eslint-disable-next-line no-unused-vars
var userToken = _tokens2.default.userToken;


describe('Car Routes: unsold cars', function () {
  it('get all unsold sale Ads', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/car?status=available').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });

  it('should return errors for wrong car sale Ad status', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/car?status=sold').set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(403);
      (0, _chai.expect)(res.body.error).to.equal('Forbidden');
      done();
    });
  });
  it('should return errors for unauthorized access', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/car?status=available').set('Accept', 'application/json').set('authorization', '').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.include.keys('error');
      (0, _chai.expect)(res.body.error).to.equal('Unauthorized user');

      done();
    });
  });
});