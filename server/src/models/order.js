/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */
import moment from 'moment';
import { config } from 'dotenv';
import orderData from './data/orderData';

const dateTime = moment().format('YYYY-MM-DD h:m:s');


config();

const { registeredSaleOrders } = orderData;


class Order {
  /**
   * class constructor
   *
   */
  constructor() {
    this.orders = registeredSaleOrders;
    this.numberOfOrders = registeredSaleOrders.length;
  }

  /**
   * @param {integer} orderId id of the order
   * @param {object} data the order details
   * @returns {object} order object
   */
  create(orderId, data) {
    const newOrder = {
      id: this.numberOforders + 1,
      orderID: orderId || '',
      createdOn: dateTime || '',
      status: data.status || '',
      price: data.price || '',
      offeredPrice: data.offeredPrice || '',
      modifiedDate: null,
    };
    this.orders.push(newOrder);
    return newOrder;
  }


  /**
   *
   * @param {integer} id
   * @returns {object} order object
   */
  findOne(id) {
    // eslint-disable-next-line radix
    return this.orders.find(order => parseInt(order.id) === id);
  }


  /**
   *
   * @param {integer} id id of the order
   * @param {integer} price new offered price
   * @returns {object} order object
   */
  update(id, price) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders[index].modifiedDate = dateTime;
    this.orders[index].offeredPrice = price;
    return this.orders[index];
  }
}


export default new Order();
