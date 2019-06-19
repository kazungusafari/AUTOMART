/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';


const { userToken } = tokens;


describe('Car Routes: unsold new cars', () => {
  it('get all unsold new sale Ads', (done) => {
    request(app)
      .get('/api/v1/car?status=available&state=new')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        console.log(res);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('should return errors for wrong car sale Ad status', (done) => {
    request(app)
      .get('/api/v1/car?status=sold&state=new')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.error).to.equal('Forbidden');
        done();
      });
  });
  it('should return errors for unauthorized access', (done) => {
    request(app)
      .get('/api/v1/car?status=available&state=new')
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