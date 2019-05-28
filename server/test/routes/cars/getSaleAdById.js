/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';

// const validID = 1;
// const invalidID = 30;

const { validUserToken } = tokens;


// eslint-disable-next-line no-undef
describe('Get a specific sale Ad:', () => {
  /*
  // eslint-disable-next-line no-undef
  it('should get a car sale Ad by a valid ID', (done) => {
    request(app)
      .get(`/api/v1/car/${validID}`)
      .set('Accept', 'application/json')
      .set('authorization', validUserToken)
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
      .set('authorization', validUserToken)
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
      .set('authorization', validUserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('id');
        expect(res.body.errors[0].msg).to.equal('Car id  can only be in the form of integers');

        done(err);
      });
  });
});
