/* eslint-disable class-methods-use-this */
import moment from 'moment';
import { config } from 'dotenv';
import hashPassword from '../helpers/hashPassword';

import db from './index';

const dateTime = moment().format('YYYY-MM-DD h:m:s');
config();

class User {
  /**
   * Create a new user in the database
   * @param {boolean} isUserAdmin show if user is admin or not
   * @param {object} userData the user data
   * @returns {object} user object
   */
  create(isUserAdmin = false, userData) {
    const queryText = `INSERT INTO
        users(firstname, lastname, email, isAdmin, password, createdOn) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    const {
      firstname, lastname, email, password,
    } = userData;

    const newPassword = hashPassword(password, 10);
    const user = [
      firstname, lastname, email, isUserAdmin,
      newPassword, dateTime,
    ];
    const response = db.query(queryText, user);
    return response;
  }


  /**
   * Find user in the database by email
   * @param {string} email the user email
   * @returns {object} user object
   */
  findOne(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const response = db.query(query, [email]);
    return response;
  }

  /**
   * Update user password in the database
   * @param {string} email the email of the user
   * @param {object} password the password of the user
   */
  update(email, password) {
    const newPassword = hashPassword(password, 10);
    const updateQuery = `UPDATE users
      SET password=$1, modified_at=$2 WHERE email=$3 returning *`;
    const details = [
      newPassword,
      dateTime,
      email,
    ];
    const response = db.query(updateQuery, details);
    return response;
  }
}


export default new User();
