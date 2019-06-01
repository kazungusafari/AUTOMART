/* eslint-disable class-methods-use-this */
import { config } from 'dotenv';
import Order from '../models/order';
import Car from '../models/car';
import Response from './utils/responseFormatter';

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
    const car = await Car.findOneCar(req.body.carId);
    if (car) {
      const order = await Order.create(req.user.id, req.body);
      return Response.customResponse(order, res, 201);
    }
    return Response.errorResponse(res, 'Car not found', 404);
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
    const order = await Order.findOneOrder(req.params.id);

    if (order) {
      if (order.owner === req.user.id && order.status === 'pending') {
        const updatedOrder = await Order.update(req.params.id, req.body.price);
        return Response.customResponse(updatedOrder, res, 200);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }
}

export default OrderController;
