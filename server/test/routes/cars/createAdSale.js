/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import tokens from '../../utils/tokens';
import app from '../../../src/app';

const { userToken, adminToken } = tokens;

const {
  validSaleAd1,
  validSaleAd2,
  validSaleAd3,
  validSaleAd4,
  invalidCarPriceFormat,
  invalidCarStateFormat,
  missingCarBodyType,
  missingCarPrice,
  missingCarStatus,
  missingCarState,
} = mockData.createSaleAd;


describe('Car Routes: create a new a sale Ad', () => {
  it('should return errors for unauthorized access', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', '')
      .send({ ...validSaleAd1 })
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
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...missingCarPrice })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('All fields are required');


        done();
      });
  });
  it('should return errors for invalid car price format', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...invalidCarPriceFormat })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('price');
        expect(res.body.errors[0].msg).to.equal('Price can only be in the form of integers');


        done();
      });
  });
  it('should return errors for invalid car state format', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...invalidCarStateFormat })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('state');
        expect(res.body.errors[0].msg).to.equal('All fields except price are suppose to be strings');


        done();
      });
  });
  it('should return errors missing car body type', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...missingCarBodyType })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('bodyType');
        expect(res.body.errors[0].msg).to.equal('All fields are required');


        done();
      });
  });
  it('should return errors missing car state', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...missingCarState })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('state');
        expect(res.body.errors[0].msg).to.equal('All fields are required');


        done();
      });
  });
  it('should return errors missing status', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...missingCarStatus })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('status');
        expect(res.body.errors[0].msg).to.equal('All fields are required');


        done();
      });
  });
});
