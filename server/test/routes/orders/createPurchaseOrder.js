/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import tokens from '../../utils/tokens';
import app from '../../../src/app';


// eslint-disable-next-line no-unused-vars
const { userToken, adminToken } = tokens;

// eslint-disable-next-line max-len
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJLYXp1bmd1IiwibGFzdG5hbWUiOiJTYWZhcmkiLCJlbWFpbCI6ImthenVuZ3Uuc2FmYXJpQGdtYWlsLmNvbSIsImFkZHJlc3MiOnsiYm94TnVtYmVyIjo2NiwicG9zdGFsQ29kZSI6MTAxMDEsInRvd24iOiJOYWlyb2JpIn0sImlzQWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6IiQyYiQxMCRvLmRxUHhQdmJHQ24wTnk2R3Jsbi8uR3hnbjlwbzdIVXMzLzVmQVhVeGRLS0dwZ2JsYUdrLiJ9LCJpYXQiOjE1NTkxMDgyMDYsImV4cCI6MTU1OTE5NDYwNn0.CpBjTCdwJjnKmy7frSjqef9sJlhzvLZasla4aT2rN2E';

const {
  validOrder,
  missingCarPrice,
  missingCarStatus,
  missingCarId,
  wrongCarId,
} = mockData.createOrder;


describe('Car Routes: create purchase order', () => {
  it('should create a new purchase order', (done) => {
    request(app)
      .post('/api/v1/order/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...validOrder })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);

        expect(res.body).to.be.a('object');


        done();
      });
  });

  it('should return errors for unauthorized access', (done) => {
    request(app)
      .post('/api/v1/order/')
      .set('Accept', 'application/json')
      .set('authorization', '')
      .send({ ...validOrder })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done();
      });
  });
  it('should return errors missing car price', (done) => {
    request(app)
      .post('/api/v1/order/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...missingCarPrice })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('All fields are required');


        done();
      });
  });

  it('should return errors if invalid car id is provided', (done) => {
    request(app)
      .post('/api/v1/order/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...wrongCarId })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.equal('Car not found');


        done();
      });
  });
  it('should return errors if  car id is missing', (done) => {
    request(app)
      .post('/api/v1/order/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...missingCarId })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('All fields are required');


        done();
      });
  });
  it('should return errors missing status', (done) => {
    request(app)
      .post('/api/v1/order/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...missingCarStatus })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('All fields are required');


        done();
      });
  });
});
