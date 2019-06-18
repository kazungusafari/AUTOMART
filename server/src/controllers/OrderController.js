/* eslint-disable prefer-destructuring */
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
    let car = null;
    const { rows } = await Car.findOneCar(req.body.carId);
    car = rows[0];
    if (car) {
      let order = null;
      const response = await Order.create(req.user.id, req.body);
      order = response.rows[0];
      if (order) {
        return Response.customResponse('Order created successfully', order, res, 201);
      }
    }
    return Response.errorResponse(res, 'Car not found', 404);
  }


  /**
     * Update the price of the order.
     * @static
     * @param {*} req the HTTP request object
     * @param {*} res the HTTP response object
     * @returns { Object } Returns the updated order Object
     * @memberof OrderController
     */
  static async UpdatePrice(req, res) {
    let foundOrder = null;
    const { rows } = await Order.findOneOrder(req.params.id);
    foundOrder = rows[0];
    if (foundOrder) {
      if (foundOrder.owner === req.user.id && foundOrder.status === 'pending') {
        let updatedOrder = null;
        const response = await Order.update(req.params.id, req.body.price);
        updatedOrder = response.rows[0];
        return Response.customResponse('Price updated successfully', updatedOrder, res, 200);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    return Response.errorResponse(res, 'Order Not Found', 404);
  }
}

export default OrderController;
