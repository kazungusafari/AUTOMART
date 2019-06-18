/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import tokens from '../../utils/tokens';
import app from '../../../src/app';

const { userToken, adminToken } = tokens;
const acceptedOrder = 5;
const validId = 1;
const invalidId = 40;
const invalidDataType = 'jjjj';


describe('Order Routes: Update purchase order price ', () => {
  const normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'orderpriceUpdate@gmail.com',
    password: 'password100',
    confirmPassword: 'password100',
  };
  const orderToGet = {
    carId: 6,
    status: 'pending',
    price: 1550000,
    offeredPrice: 5000000,
    owner: 2,

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
        const { token } = res.body.data;
        request(app)
          .post('/api/v1/car')
          .set('authorization', `Bearer ${token}`)
          .send(carToGet)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            request(app)
              .post('/api/v1/order')
              .set('authorization', `Bearer ${userToken}`)
              .send(orderToGet)
              .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                done();
              });
          });
      });
  });
  it('should update purchase order price.', (done) => {
    request(app)
      .patch('/api/v1/order/2/price')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ price: 15000000 })
      .end((err, res) => {
        console.log(res);
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
        expect(res.body.error).to.equal('Order Not Found');
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
