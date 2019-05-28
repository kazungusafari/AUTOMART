/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';
import authorization from '../../../src/middlewares/Authorization';
import hashPassword from '../../../src/helpers/hashPassword';


// eslint-disable-next-line no-unused-vars
const adminToken = authorization.generateToken({
  id: 2,
  firstname: 'Pedro',
  lastname: 'Lili',
  email: 'lili@gmail.com',
  address: {
    boxNumber: 60,
    postalCode: 10101,
    town: 'Kericho',
  },
  isAdmin: true,
  password: hashPassword('pedrolili100', 10),
});
const userToken = authorization.generateToken({
  id: 1,
  firstname: 'Kazungu',
  lastname: 'Safari',
  email: 'kazungu.safari@gmail.com',
  address: {
    boxNumber: 66,
    postalCode: 10101,
    town: 'Nairobi',
  },
  isAdmin: false,
  password: hashPassword('kazungu100', 10),
});

const {
  validSaleAd,
  invalidCarPriceFormat,
  invalidCarStateFormat,
  missingCarBodyType,
  missingCarPrice,
  missingCarStatus,
  missingCarState,
} = mockData.createSaleAd;


describe('Car Routes: create a new a sale Ad', () => {
  it('should add a new sale AD', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...validSaleAd })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);

        expect(res.body).to.be.a('object');


        done();
      });
  });

  it('should return errors for unauthorized access', (done) => {
    request(app)
      .post('/api/v1/car/')
      .set('Accept', 'application/json')
      .set('authorization', '')
      .send({ ...validSaleAd })
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
