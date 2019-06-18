'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

var _tokens = require('../../utils/tokens');

var _tokens2 = _interopRequireDefault(_tokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
var userToken = _tokens2.default.userToken;


describe('Car Routes: unsold cars within a price range', function () {

  it('get all  unsold cars within a price range.', function (done) {
    (0, _supertest2.default)(_app2.default).get(encodeURI('/api/v1/car')).query({ min_price: 1000000, max_price: 3000000, status: 'available' }).set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });

  it('should return error if no unsold cars within a given range is found', function (done) {
    (0, _supertest2.default)(_app2.default)
    // eslint-disable-next-line no-irregular-whitespace
    .get(encodeURI('/api/v1/car')).set('Accept', 'application/json').set('authorization', 'Bearer ' + userToken).query({ max_price: 4000000, min_price: 15000000, status: 'available' }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(404);
      (0, _chai.expect)(res.body.error).to.equal('Not Found');
      done();
    });
  });

  it('should return error for unauthorized access', function (done) {
    (0, _supertest2.default)(_app2.default).get(encodeURI('/api/v1/car')).set('Accept', 'application/json').set('authorization', '').query({ max_price: 1000000, min_price: 3000000, status: 'available' }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Unauthorized user');

      done();
    });
  });
});