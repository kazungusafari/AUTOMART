/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
import { config } from 'dotenv';
import Flag from '../models/order';
import Car from '../models/car';
import Response from './utils/responseFormatter';

config();

/**
 *
 * @class FlagController
 */
class FlagController {
  /**
   * Create a flag.
   * @static
   * @param {object} req the HTTP request object
   * @param {object} res the HTTP response body
   * @returns { Object } the created flag object
   * @memberof FlagController
   */
  static async createFlag(req, res) {
    let car = null;
    const { rows } = await Car.findOneCar(req.body.carId);
    car = rows[0];
    if (car) {
      let flag = null;
      const response = await Flag.create(req.user.id, req.body);
      flag = response.rows[0];
      if (flag) {
        return Response.customResponse('Flag created successfully', flag, res, 201);
      }
    }
    return Response.errorResponse(res, 'Car not found', 404);
  }
}

export default FlagController;
