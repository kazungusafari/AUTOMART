'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('API', function () {
  it('Should return JSON responses', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.include.keys('message');
      (0, _chai.expect)(res.body.message).to.equal('Welcome to AutoMart API');

      done(err);
    });
  });

  it('Should return JSON responses', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.include.keys('message');
      (0, _chai.expect)(res.body.message).to.equal('Welcome to version 1 of AutoMart API');

      done(err);
    });
  });

  describe('404', function () {
    it('should return error for page not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/ffffrmf').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(404);
        (0, _chai.expect)(res.body).to.include.keys('error');
        (0, _chai.expect)(res.body.error).to.equal('Page Not Found');

        done(err);
      });
    });
  });
}); /* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */