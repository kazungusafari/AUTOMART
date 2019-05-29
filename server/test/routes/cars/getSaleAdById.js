
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
// import tokens from '../../utils/tokens';

// eslint-disable-next-line no-unused-vars
const validID = 1;
// eslint-disable-next-line no-unused-vars
const invalidID = 30;

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJLYXp1bmd1IiwibGFzdG5hbWUiOiJTYWZhcmkiLCJlbWFpbCI6ImthenVuZ3Uuc2FmYXJpQGdtYWlsLmNvbSIsImFkZHJlc3MiOnsiYm94TnVtYmVyIjo2NiwicG9zdGFsQ29kZSI6MTAxMDEsInRvd24iOiJOYWlyb2JpIn0sImlzQWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6IiQyYiQxMCRvLmRxUHhQdmJHQ24wTnk2R3Jsbi8uR3hnbjlwbzdIVXMzLzVmQVhVeGRLS0dwZ2JsYUdrLiJ9LCJpYXQiOjE1NTkxMDgyMDYsImV4cCI6MTU1OTE5NDYwNn0.CpBjTCdwJjnKmy7frSjqef9sJlhzvLZasla4aT2rN2E';


// eslint-disable-next-line no-undef
describe('Get a specific sale Ad:', () => {
  // eslint-disable-next-line no-undef

  
  it('should get a car sale Ad by a valid ID', (done) => {
    request(app)
      .get(`/api/v1/car/${validID}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('data');
        done(err);
      });
  });

  it('should return errors for invalid ID', (done) => {
    request(app)
      .get('/api/v1/car/45')
      .set('authorization', `Bearer ${userToken}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Sale Ad Not Found');
        done(err);
      });
  });
  
  it('should return errors for invalid ID', (done) => {
    request(app)
      .get('/api/v1/car/hhhh')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('id');
        expect(res.body.errors[0].msg).to.equal('Car id  can only be in the form of integers');

        done(err);
      });
  });
});
