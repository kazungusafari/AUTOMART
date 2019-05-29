/* eslint-disable eqeqeq */
import moment from 'moment';
import { config } from 'dotenv';
import carData from './data/carData';

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
      createdOn: moment.now() || '',
      state: data.state || '',
      status: data.status || '',
      address: data.price || '',
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      bodyType: data.bodyType || '',
      modifiedDate: moment.now(),
    };
    this.cars.push(newCar);
    return newCar;
  }


  /**
   *
   * @param {integer} id
   * @returns {object} car object
   */
  findOne(id) {
    // eslint-disable-next-line radix
    return this.cars.find(car => parseInt(car.id) === id);
  }

  /**
   * @returns {array} returns all cars
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
   * @param {string} minPrice
   * @param {string} maxPrice
   * @returns {array} returns all unsold cars within a given price range
   */
  findAllByPriceRange(minPrice, maxPrice) {
    const unsoldCars = this.cars.filter(car => car.status === 'available');
    return unsoldCars.filter(car => car.price >= minPrice && car.price <= maxPrice);
  }

  /**
   *
   * @param {string} id
   * @param {string} status
   * @returns {object} car object
   */
  updateStatus(id, status) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].modifiedDate = moment.now();
    this.cars[index].status = status;
    return this.cars[index];
  }


  /**
   *
   * @param {integer} id
   */
  delete(id) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
    return {};
  }
}


export default new Car();
