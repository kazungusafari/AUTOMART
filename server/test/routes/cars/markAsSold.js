/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

import tokens from '../../utils/tokens';

const { userToken } = tokens;


describe('Car Routes: Mark as sold', () => {
  const normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'zima@gmail.com',
    password: 'password100',
    confirmPassword: 'password100',
  };
  const carToDelete = {
    state: 'new',
    status: 'available',
    price: 1550000,
    manufacturer: 'Honda',
    model: 'Honda Model',
    bodyType: 'saloon',
  };
  before((done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(normalUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        var { token, id } = res.body.data;
        request(app)
          .post('/api/v1/car/')
          .set('authorization', `Bearer ${userToken}`)
          .send(carToDelete)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });
  });
  it('should mark car as sold.', (done) => {
    request(app)
      .patch('/api/v1/car/6/status')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return error if the car is not found', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .patch('/api/v1/car/10/status')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.equal('Not Found');

        done();
      });
  });

  it('should return error for unauthorized access', (done) => {
    request(app)
      .patch('/api/v1/car/1/status')
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

  it('should return error for if id is not an integer', (done) => {
    request(app)
      .patch('/api/v1/car/llll/status')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);


        done();
      });
  });
});
