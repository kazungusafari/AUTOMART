/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';


const { userToken } = tokens;


describe('Car Routes: unsold used cars', () => {
  const adminUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'mmmmmm@gmail.com',
    password: 'password100',
    confirmPassword: 'password100',
  };
  const carToDelete = {
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
      .send(adminUser)
      .query({ admin: true })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        const { token, id } = res.body.data;
        request(app)
          .post('/api/v1/car/')
          .set('authorization', `Bearer ${token}`)
          .send(carToDelete)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });
  });
  it('get all unsold used sale Ads', (done) => {
    request(app)
      .get('/api/v1/car?status=available&state=used')
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
      .get('/api/v1/car?status=sold&state=used')
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
      .get('/api/v1/car?status=available&state=used')
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