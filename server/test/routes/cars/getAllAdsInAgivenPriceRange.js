/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../../utils/tokens';

const { userToken } = tokens;


// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJLYXp1bmd1IiwibGFzdG5hbWUiOiJTYWZhcmkiLCJlbWFpbCI6ImthenVuZ3Uuc2FmYXJpQGdtYWlsLmNvbSIsImFkZHJlc3MiOnsiYm94TnVtYmVyIjo2NiwicG9zdGFsQ29kZSI6MTAxMDEsInRvd24iOiJOYWlyb2JpIn0sImlzQWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6IiQyYiQxMCRvLmRxUHhQdmJHQ24wTnk2R3Jsbi8uR3hnbjlwbzdIVXMzLzVmQVhVeGRLS0dwZ2JsYUdrLiJ9LCJpYXQiOjE1NTkxMDgyMDYsImV4cCI6MTU1OTE5NDYwNn0.CpBjTCdwJjnKmy7frSjqef9sJlhzvLZasla4aT2rN2E';

describe('Car Routes: unsold cars', () => {
  it('get all  unsold cars within a price range.', (done) => {
    request(app)
      .get(encodeURI('/api/v1/car?status=available&min_price=​1000000​&max_price=​1500000'))
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('should return error if no unsold cars within a given range is found', (done) => {
    request(app)
      // eslint-disable-next-line no-irregular-whitespace
      .get(encodeURI('/api/v1/car?status=available&min_price=​100000000​00&max_price=​1500000000'))
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.errors[0].msg).to.equal('Not Found');
        done();
      });
  });

  it('should return error for unauthorized access', (done) => {
    request(app)
      .get(encodeURI('/api/v1/car?status=available&min_price=​100000​&max_price=​1500000'))
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
