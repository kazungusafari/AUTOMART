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
  it('get all cars', (done) => {
    request(app)
      .delete('/api/v1/car/1')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.equal('Car Ad successfully deleted');

        done();
      });
  });
  it('should return error if user token is used', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .delete('/api/v1/car/2')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.error).to.equal('Forbidden');
        done();
      });
  });

  it('should return error no token is provided', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .delete('/api/v1/car/4')
      .set('Accept', 'application/json')
      .set('authorization', '')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.error).to.equal('Unauthorized user');
        done();
      });
  });

  it('should return error if car is not found', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .delete('/api/v1/car/40')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.equal('Sale Ad Not Found');
        done();
      });
  });
});
