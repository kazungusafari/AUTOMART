/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';

const { userToken } = tokens;


describe('Car Routes: unsold cars within a price range', () => {

  it('get all  unsold cars within a price range.', (done) => {
    request(app)
      .get(encodeURI('/api/v1/car'))
      .query({ min_price: 1000000, max_price: 3000000, status: 'available' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('should return error if no unsold cars within a given range is found', (done) => {
    request(app)
    // eslint-disable-next-line no-irregular-whitespace
      .get(encodeURI('/api/v1/car'))
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .query({ max_price: 4000000, min_price: 15000000, status: 'available' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.equal('Not Found');
        done();
      });
  });

  it('should return error for unauthorized access', (done) => {
    request(app)
      .get(encodeURI('/api/v1/car'))
      .set('Accept', 'application/json')
      .set('authorization', '')
      .query({ max_price: 1000000, min_price: 3000000, status: 'available' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.error).to.equal('Unauthorized user');

        done();
      });
  });
});
