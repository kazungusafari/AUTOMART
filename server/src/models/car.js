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
   * @returns {object} user object
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
   * @param {string} id
   * @returns {object} user object
   */
  findOne(id) {
    return this.cars.find(car => car.id === id);
  }

  /**
   * @returns {array} returns all cars
   */
  findAll() {
    return this.cars;
  }

  /**
   * @returns {array} returns all unsold cars
   */
  findAllByStatus(status) {
    return this.cars.filter(this.cars, car => car.status === status);
  }

  /**
   * @returns {array} returns all unsold cars within a given price range
   */
  findAllByPriceRange(minPrice, maxPrice) {
    const unsoldCars = this.cars.filter(this.cars, car => car.status === 'available');
    return unsoldCars.filter(unsoldCars, car => car.price >= minPrice && car.price <= maxPrice);
  }

  /**
   *
   * @param {string} id
   * @param {object} data
   */
  update(id, data) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].id = car.id;
    this.cars[index].owner = car.owner;
    this.cars[index].createdOn = car.createdOn;
    this.cars[index].modifiedDate = moment.now();
    this.cars[index].state = car.state;
    this.cars[index].status = data.status || car.status;
    this.cars[index].price = data.price || car.price;
    this.cars[index].model = car.model;
    this.cars[index].manufacturer = car.manufacturer;
    this.cars[index].bodyType = car.bodyType;
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
