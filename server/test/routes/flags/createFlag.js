/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import tokens from '../../utils/tokens';
import app from '../../../src/app';


const { userToken } = tokens;

const {

  missingCarPrice,
  missingCarStatus,
  missingCarId,
  wrongCarId,
} = mockData.createFlag;


describe('flags Routes: Create purchase flag', () => {
  const normalUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: '100,11000,Nairobi',
    email: 'updateflagee@gmail.com',
    password: 'password100',
    confirmPassword: 'password100',
  };
  const validflag = {
    carId: 2,
    reason: 'Weird pricing',
    description: 'Too expensive.Dont buy',

  };
  before((done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(normalUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it('should create a new flag', (done) => {
    request(app)
      .post('/api/v1/flag/')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ ...validflag })
      .end((err, res) => {
        console.log(res);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.a('object');


        done();
      });
  });

  it('should return errors for unauthorized access', (done) => {
    request(app)
      .post('/api/v1/flag/')
      .set('Accept', 'application/json')
      .set('authorization', '')
      .send({ ...validflag })
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
      .post('/api/v1/flag/')
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
      .post('/api/v1/flag/')
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
      .post('/api/v1/flag/')
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
      .post('/api/v1/flag/')
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
