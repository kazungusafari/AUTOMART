/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

import tokens from '../../utils/tokens';

const { userToken , adminToken } = tokens;


const validId = 2;
const invalidId = 40;
const invalidDataType = 'jjjj';


describe('Car Routes: Update sale Ad price', () => {
  const normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'updatesellingprice@gmail.com',
    password: 'password100',
    confirmPassword: 'password100',
  };
  const carToGet = {
    state: 'used',
    status: 'available',
    price: 1550000,
    manufacturer: 'BMW',
    model: '1 series',
    bodyType: 'saloon',
  };
  before((done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(normalUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        request(app)
          .post('/api/v1/car/')
          .set('authorization', `Bearer ${userToken}`)
          .send(carToGet)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });
  });
  it('should update price of the car.', (done) => {
    request(app)
      .patch('/api/v1/car/5/price')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ price: 15000000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return error if the car is not found', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .patch(`/api/v1/car/${invalidId}/price`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ price: 1500000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.equal('Not Found');

        done();
      });
  });

  it('should return error for unauthorized access', (done) => {
    request(app)
      .patch(`/api/v1/car/${validId}/price`)
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

  it('should return error for if car id is not an integer', (done) => {
    request(app)
      .patch(`/api/v1/car/${invalidDataType}/price`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ price: 15000000 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);


        done();
      });
  });
});