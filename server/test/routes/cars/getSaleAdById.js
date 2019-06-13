/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';

const { userToken } = tokens;


const validID = 5;
const invalidID = 30;


describe('Get a specific sale Ad:', () => {
  const normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'gugu@gmail.com',
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
        const { token } = res.body.data;
        request(app)
          .post('/api/v1/car/')
          .set('authorization', `Bearer ${token}`)
          .send(carToGet)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });
  });
  it('should get a car sale Ad by a valid ID', (done) => {
    request(app)
      .get('/api/v1/car/1')
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
        expect(res.body.error).to.equal('Sale Ad Not Found');
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
        expect(res.body.errors[0].msg).to.equal('Id can only be in the form of integers');

        done(err);
      });
  });
});
