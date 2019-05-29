/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';

const { adminToken, userToken } = tokens;


describe('Car Routes: All cars', () => {
  it('get all cars within .', (done) => {
    request(app)
      .get('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return error if user token is used', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .get('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.errors[0].msg).to.equal('Not Found');
        done();
      });
  });
});
