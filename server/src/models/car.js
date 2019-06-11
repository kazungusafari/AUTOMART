/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */
import moment from 'moment';
import { config } from 'dotenv';
import carData from './data/carData';

const dateTime = moment().format('YYYY-MM-DD h:m:s');


config();

const { registeredSaleAds } = carData;


class Car {
  /**
   * class constructor
   *
   */
  constructor() {
    this.cars = registeredSaleAds;
    this.numberOfCars = registeredSaleAds.length;
  }

  /**
   * @param {integer} userId
   * @param {object} data
   * @returns {object} car object
   */
  create(userId, data) {
    const newCar = {
      id: this.numberOfCars + 1,
      owner: userId || '',
      createdOn: dateTime || '',
      state: data.state || '',
      status: data.status || '',
      price: data.price || '',
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      bodyType: data.bodyType || '',
      modifiedDate: null,
    };
    this.cars.push(newCar);
    return newCar;
  }


  /**
   *
   * @param {integer} id
   * @returns {object} car object
   */
  findOneCar(id) {
    // eslint-disable-next-line radix
    return this.cars.find(car => car.id === id);
  }

  /**
   * @returns { Array } returns all cars
   */
  findAll() {
    return this.cars;
  }

  /**
   * @param {string} status
   * @returns {Array} returns an array of all unsold cars
   */
  findAllByStatus(status) {
    return this.cars.filter(car => car.status === status);
  }

  /**
   * @param {integer} minPrice
   * @param {integer} maxPrice
   * @param {string} status
   * @returns {array} returns all unsold cars within a given price range
   */
  findAllByPriceRange(minPrice, maxPrice, status) {
    const cars = [];
    this.cars.forEach((car) => {
      // eslint-disable-next-line max-len
      if ((car.status === status) && (car.price >= minPrice && car.price <= maxPrice)) cars.push(car);
    });
    return cars;
  }

  /**
   *
   * @param {integer} id
   * @returns {object} car object
   */
  updateStatus(id) {
    const car = this.findOneCar(id);
    const index = this.cars.indexOf(car);
    this.cars[index].modifiedDate = dateTime;
    this.cars[index].status = 'sold';
    return this.cars[index];
  }

  /**
   *
   * @param {integer} id id of the car
   * @param {integer} price new selling price
   * @returns {object} car object
   */
  updateSellingPrice(id, price) {
    const car = this.findOneCar(id);
    const index = this.cars.indexOf(car);
    this.cars[index].modifiedDate = dateTime;
    this.cars[index].price = price;
    return this.cars[index];
  }

  /**
   *
   * @param {integer} id id of the car
   * @returns {boolean} true if success or false if not deleted
   */
  // eslint-disable-next-line consistent-return
  delete(id) {
    const car = this.findOneCar(id);
    if (car !== undefined) {
      const index = this.cars.indexOf(car);
      if (this.cars.splice(index, 1)) {
        return true;
      }
      return false;
    }
    return false;
  }
}


export default new Car();
