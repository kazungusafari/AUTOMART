/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';


// eslint-disable-next-line no-unused-vars
const validID = 1;
// eslint-disable-next-line no-unused-vars
const invalidID = 30;

// eslint-disable-next-line no-unused-vars
const { userToken } = tokens;

//const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJLYXp1bmd1IiwibGFzdG5hbWUiOiJTYWZhcmkiLCJlbWFpbCI6ImthenVuZ3Uuc2FmYXJpQGdtYWlsLmNvbSIsImFkZHJlc3MiOnsiYm94TnVtYmVyIjo2NiwicG9zdGFsQ29kZSI6MTAxMDEsInRvd24iOiJOYWlyb2JpIn0sImlzQWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6IiQyYiQxMCRvLmRxUHhQdmJHQ24wTnk2R3Jsbi8uR3hnbjlwbzdIVXMzLzVmQVhVeGRLS0dwZ2JsYUdrLiJ9LCJpYXQiOjE1NTkxMDgyMDYsImV4cCI6MTU1OTE5NDYwNn0.CpBjTCdwJjnKmy7frSjqef9sJlhzvLZasla4aT2rN2E';


describe('Car Routes: unsold cars', () => {

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
        expect(res.body.error).to.equal('Not found');
        done();
      });
  });
  

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
