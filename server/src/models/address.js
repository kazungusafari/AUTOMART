/* eslint-disable class-methods-use-this */
import moment from 'moment';
import { config } from 'dotenv';
import db from './index';

const dateTime = moment().format('YYYY-MM-DD h:m:s');

config();


class Address {
  /**
   * Create a new user address in the database
   * @param {object} userId the id of the new user
   * @param {object} addressData the address object
   * @returns {object} address object
   */
  create(userId, addressData) {
    const queryText = `INSERT INTO
        addresses(boxNumber, postalCode, town,usedBy, createdDate) 
        VALUES ($1, $2, $3, $4, $5) returning *`;
    const {
      boxNumber, postalCode, town,
    } = addressData;
    const address = [
      boxNumber, postalCode, town, userId,
      dateTime,
    ];
    const response = db.query(queryText, address);
    return response;
  }
}

export default new Address();
