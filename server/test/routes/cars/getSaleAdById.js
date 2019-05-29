
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import Authorization from '../../../src/middlewares/Authorization';
import hashPassword from '../../../src/helpers/hashPassword';

const validID = 1;
// eslint-disable-next-line no-unused-vars
const invalidID = 30;

// eslint-disable-next-line no-unused-vars
const adminToken = Authorization.generateToken({
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
// eslint-disable-next-line no-unused-vars
const userToken = Authorization.generateToken({
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


// eslint-disable-next-line no-undef
describe('Get a specific sale Ad:', () => {
  // eslint-disable-next-line no-undef

  /*
  it('should get a car sale Ad by a valid ID', (done) => {
    request(app)
      .get(`/api/v1/car/${validID}`)
      .set('Accept', 'application/json')
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
      .get(`/api/v1/car/${invalidID}`)
      .set('authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Sale Ad Not Found');
        done(err);
      });
  });
  */
  it('should return errors for invalid ID', (done) => {
    request(app)
      .get('/api/v1/car/hhhh')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('id');
        expect(res.body.errors[0].msg).to.equal('Car id  can only be in the form of integers');

        done(err);
      });
  });
});
