/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */
import moment from 'moment';
import { config } from 'dotenv';
import db from './index';

const dateTime = moment().format('YYYY-MM-DD h:m:s');

config();

class Car {
  /**
   * Create a new car sale ad in the database
   * @param {integer} userId the id of the user posting sale Ad
   * @param {object} data the sale Ad details
   * @returns {object} car object
   */
  create(userId, data) {
    const car = [
      userId,
      dateTime,
      data.state,
      data.status,
      data.price,
      data.manufacturer,
      data.model,
      data.bodyType,
      null,
    ];

    const text = `INSERT INTO
        cars(owner, createdDate, state,status,price,manufacturer,model,bodyType,modifiedDate)
        VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) returning *`;

    const response = db.query(text, car);
    return response;
  }


  /**
   * Get a specific sale ad in the database by id
   * @param {integer} id the id of the car to find
   * @returns {object} car object
   */
  findOneCar(id) {
    const text = 'SELECT * FROM cars WHERE id = $1';
    const response = db.query(text, [id]);
    return response;
  }

  /**
   * Return all sale ads in the database
   * @returns { Array } returns all cars
   */
  findAll() {
    const findAllQuery = 'SELECT * FROM cars';
    const response = db.query(findAllQuery);
    return response;
  }

  /**
   * Get all sale ads in the database of a given status
   * @param {string} status the car status
   * @returns {Array} returns an array of all unsold cars
   */
  findAllByStatus(status) {
    const text = 'SELECT * FROM cars WHERE status = $1';
    const response = db.query(text, [status]);
    return response;
  }

  /**
   * Get all sale ads in the database within a given price range
   * @param {integer} minPrice the minimum price of the car
   * @param {integer} maxPrice the maximum price of the car
   * @param {string} status the status of the car
   * @returns {array} returns all unsold cars within a given price range
   */
  findAllByPriceRange(minPrice, maxPrice, status) {
    const details = [
      status,
      minPrice,
      maxPrice,
    ];
    const text = 'SELECT * FROM cars WHERE status = $1 AND price BETWEEN $2 AND $3 ';
    const response = db.query(text, details);
    return response;
  }

  /**
   * Update status of a sale ad in the database
   * @param {integer} id the id of the car
   * @returns {object} car object
   */
  updateStatus(id) {
    const updateQuery = `UPDATE cars
    SET status=$1, modifiedDate=$2 WHERE id=$3 returning *`;
    const details = [
      'sold',
      dateTime,
      id,
    ];
    const response = db.query(updateQuery, details);
    return response;
  }

  /**
   * Update the selling price of a sale ad in the database
   * @param {integer} id id of the car
   * @param {integer} price new selling price
   * @returns {object} car object
   */
  updateSellingPrice(id, price) {
    const updateQuery = `UPDATE cars
    SET price=$1, modifiedDate=$2 WHERE id=$3 returning *`;
    const details = [
      price,
      dateTime,
      id,
    ];
    const response = db.query(updateQuery, details);
    return response;
  }

  /**
   * Delete a sale ad in the database
   * @param {integer} id id of the car
   * @returns {Object} return deleted car object
   */
  delete(id) {
    const deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
    const response = db.query(deleteQuery, [id]);
    return response;
  }
}


export default new Car();
