/* eslint-disable class-methods-use-this */
import { config } from 'dotenv';
import Order from '../models/order';
import Car from '../models/car';

config();


/**
 *
 * @class CarController
 */
class OrderController {
  /**
   * Create a purchase order.
   * @static
   * @param {object} req the HTTP request object
   * @param {object} res the HTTP response body
   * @returns { Object } the created purchase order
   * @memberof UserController
   */
  static async createOrder(req, res) {
    const car = await Car.findOne(req.body.carId);
    if (car) {
      const order = await Order.create(req.body.carId, req.body);
      return res.status(201).send(
        {
          status: res.statusCode,
          data: {
            id: order.id,
            carId: order.carId,
            createdOn: order.createdOn,
            price: order.price,
            offeredPrice: order.offeredPrice,
            status: order.status,
          },
        },
      );
    }
    return res.status(404).send({
      status: res.statusCode,
      error: 'Car not found',
    });
  }
}

export default OrderController;
