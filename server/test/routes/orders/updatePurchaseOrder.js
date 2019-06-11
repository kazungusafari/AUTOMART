/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

import tokens from '../../utils/tokens';

const { userToken, adminToken } = tokens;

const acceptedOrder = 5;
const validId = 7;
const invalidId = 40;
const invalidDataType = 'jjjj';


describe('Order Routes: Update purchase order price ', () => {
  it('should update purchase order price.', (done) => {
    request(app)
      .patch(`/api/v1/order/${validId}/price`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ price: 15000000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return error if the purchase order is not found', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .patch(`/api/v1/order/${invalidId}/price`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ price: 1500000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.equal('Not Found');
        done();
      });
  });

  it('should return error if the purchase order status is not pending', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .patch(`/api/v1/order/${acceptedOrder}/price`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ price: 1500000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.error).to.equal('Forbidden');
        done();
      });
  });

  it('should return error for unauthorized access', (done) => {
    request(app)
      .patch(`/api/v1/order/${validId}/price`)
      .set('Accept', 'application/json')
      .set('authorization', '')
      .send({ price: 15000000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');
        done();
      });
  });

  it('should return error for if order id is not an integer', (done) => {
    request(app)
      .patch(`/api/v1/order/${invalidDataType}/price`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ price: 15000000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return error  if wrong owner  try to update purchase order price', (done) => {
    request(app)
      .patch(`/api/v1/order/${validId}/price`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ price: 15000000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.error).to.equal('Forbidden');
        done();
      });
  });
});
