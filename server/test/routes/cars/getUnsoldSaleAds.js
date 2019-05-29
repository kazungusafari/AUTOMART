/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';


// eslint-disable-next-line no-unused-vars
const validID = 1;
// eslint-disable-next-line no-unused-vars
const invalidID = 30;


describe('Car Routes: unsold cars', () => {
  /*
  it('get all unsold sale Ads', (done) => {
    request(app)
      .get('/api/v1/car?status=available')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return errors for wrong car sale Ad status', (done) => {
    request(app)
      .get('/api/v1/car?status=sold')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.errors[0].msg).to.equal('Not Found');
        done();
      });
  });
  */

  it('should return errors for unauthorized access', (done) => {
    request(app)
      .get('/api/v1/car?status=available')
      .set('Accept', 'application/json')
      .set('authorization', '')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done();
      });
  });
});
