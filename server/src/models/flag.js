/* eslint-disable class-methods-use-this */
import moment from 'moment';
import { config } from 'dotenv';
import db from './index';

const dateTime = moment().format('YYYY-MM-DD h:m:s');

config();

class Flag {
  /**
   * Mark a sale Ad as fraudulent
   * @param {integer} userId id of the user
   * @param {object} data the flag details
   * @returns {object} flag object
   */
  create(userId, data) {
    const flag = [
      userId,
      data.carId,
      data.reason,
      data.description,
      dateTime,
    ];

    const text = `INSERT INTO
      flags(owner, car_id, reason,description,created_date)
      VALUES ($1, $2, $3,$4,$5,$6,$7,$8) returning *`;

    const response = db.query(text, flag);
    return response;
  }
}
export default new Flag();
