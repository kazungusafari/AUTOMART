/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const {
  validNormalUser,
  validAdminUser,
  noEmail,
  noPassword,
  invalidEmailFormat,
  invalidPasswordFormat
} = mockData.login;


describe('Auth routes: login', () => {
  it('should login a valid nominal user', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...validNormalUser})
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.include.keys('firstname');
        expect(res.body.data).to.include.keys('lastname');
        expect(res.body.data).to.include.keys('email');
        expect(res.body.data).to.include.keys('isAdmin');
        expect(res.body.data).to.include.keys('token');
        expect(res.body.data.isAdmin).to.equal(false);

        done(err);
      });
  });

 it('should return login in an Admin User', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...validAdminUser })
      .end((err, res) => {
        
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.include.keys('token');
        expect(res.body.data).to.include.keys('firstname');
        expect(res.body.data).to.include.keys('lastname');
        expect(res.body.data).to.include.keys('email');
        expect(res.body.data).to.include.keys('isAdmin');
        expect(res.body.data.isAdmin).to.equal(true);

        done(err);
      });
  });

 it('should return error of missing password field', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...noPassword })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        

        done(err);
      });
  });
 it('should return error of missing email field', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...noEmail})
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        

        done(err);
      });
  });
  it('should return error for invalid email format', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...invalidEmailFormat })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include.keys('errors');

        done(err);
      });
  });
});


it('should return error for invalid password format', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...invalidPasswordFormat })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include.keys('errors');

        done(err);
      });
  });



   