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
      const order = await Order.create(req.user.id, req.body);
      return res.status(201).send(
        {
          status: res.statusCode,
          data: {
            id: order.id,
            carId: order.carId,
            owner: order.owner,
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


  /**
     * Update the price of the order.
     * @static
     * @param {*} req the HTTP request object
     * @param {*} res the HTTP response object
     * @returns { Object } Returns the updated order Object
     * @memberof CarController
     */
  static async UpdatePrice(req, res) {
    const order = await Order.findOne(parseInt(req.params.id, 10));

    if (order) {
      if (order.owner === req.user.id && order.status === 'pending') {
        const updatedOrder = Order.update(parseInt(req.params.id, 10), req.body.price);
        return res.status(200).send(
          {
            status: res.statusCode,
            data: {
              id: updatedOrder.id,
              carId: updatedOrder.carId,
              owner: updatedOrder.owner,
              modifiedOn: updatedOrder.modifiedOn,
              oldOfferedPrice: updatedOrder.price,
              newOfferedPrice: updatedOrder.offeredPrice,
              status: order.status,
            },
          },
        );
      }
      return res.status(403).json({
        status: res.statusCode,
        error: 'Forbidden',
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'Not Found',
    });
  }
}

export default OrderController;
