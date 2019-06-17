/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */
import moment from 'moment';
import { config } from 'dotenv';
import db from './index';

const dateTime = moment().format('YYYY-MM-DD h:m:s');

config();

class Order {
  /**
   * Create a new order in the database
   * @param {integer} orderId id of the car
   * @param {object} data the order details
   * @returns {object} order object
   */
  create(userId, data) {
    const order = [
      userId,
      data.carId,
      data.price,
      data.offeredPrice,
      data.status,
      dateTime,
      null,
    ];

    const text = `INSERT INTO
      orders(owner, carId, price,offeredPrice,status,createdDate,modifiedDate)
      VALUES ($1, $2, $3,$4,$5,$6,$7) returning *`;

    const response = db.query(text, order);
    return response;
  }


  /**
   * Find an order in the database by id
   * @param {integer} id the id of the order
   * @returns {object} order object
   */
  findOneOrder(id) {
    const text = 'SELECT * FROM orders WHERE id = $1';
    const response = db.query(text, [id]);
    return response;
  }


  /**
   * Update the buying price of the order
   * @param {integer} id id of the order
   * @param {integer} price new offered price
   * @returns {object} order object
   */
  update(id, price) {
    const updateQuery = `UPDATE orders
      SET price=$1, modifiedOn=$2 WHERE id=$3 returning *`;
    const details = [
      price,
      dateTime,
      id,
    ];
    const response = db.query(updateQuery, details);
    return response;
  }
}


export default new Order();
