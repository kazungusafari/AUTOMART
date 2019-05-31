/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { config } from 'dotenv';
import User from '../models/user';
import Car from '../models/car';
import Response from './utils/responseFormatter';

config();


/**
 *
 * @class CarController
 */
class CarController {
  /**
   * Create a new sale AD
   * @static
   * @param {object} req
   * @param {object} res
   * @returns { Object }
   * @memberof UserController
   */
  static async createSaleAd(req, res) {
    const user = User.findOne(req.user.email);
    if (user) {
      const saleAd = Car.create(req.user.id, req.body);
      return Response.customResponse(saleAd, res, 201);
    }
    return Response.errorResponse(res, 'User is not registered', 404);
  }

  /**
     * Get a car sale Ad by id
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Object } Returns a sale Ad object
     * @memberof CarController
   */

  static async getSaleAdById(req, res) {
    // eslint-disable-next-line radix
    const saleAd = await Car.findOne(parseInt(req.params.id, 10));
    if (saleAd) {
      return Response.customResponse(saleAd, res, 200);
    }
    return Response.errorResponse(res, 'Sale Ad Not Found', 404);
  }


  /**
     * Get all unsold car Ads
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Array } Returns an array of Objects
     * @memberof CarController
     */
  static async getAllSaleAds(req, res) {
    // eslint-disable-next-line radix
    const queryLength = parseInt(Object.keys(req.query).length);
    // eslint-disable-next-line camelcase
    const { max_price, min_price, status } = req.query;
    if (queryLength === 0) {
      if (req.user.isAdmin === true) {
        return CarController.getAllCars(res);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    if (queryLength === 1 && status) {
      if (req.query.status === 'available') {
        const allUnsoldAds = Car.findAllByStatus(req.query.status);
        return CarController.response(allUnsoldAds, res);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    if (queryLength === 3 && min_price && max_price && status) {
      const allUnsoldByPriceRange = Car.findAllByPriceRange(min_price, max_price, status);
      return CarController.response(allUnsoldByPriceRange, res);
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }

  /**
     * Mark posted car as sold
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Object } Returns the updated car Object
     * @memberof CarController
     */
  static async markAdAsSold(req, res) {
    const car = await Car.findOne(parseInt(req.params.id, 10));
    if (car) {
      if (car.owner === req.user.id) {
        const updatedCar = Car.updateStatus(parseInt(req.params.id, 10));
        return Response.customResponse(updatedCar, res, 200);
      }
      return Response.errorResponse(res, 'Unauthorised User');
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }

  /**
     * Return all posted ads whether sold or available.
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Array } Returns an array of all posted ads
     * @memberof CarController
     */
  static async getAllCars(res) {
    const allCars = await Car.findAll();
    return CarController.response(allCars, res);
  }

  /**
     * Update the price of a car.
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Object } Returns the updated car Object
     * @memberof CarController
     */
  static async UpdatePrice(req, res) {
    const car = await Car.findOne(parseInt(req.params.id, 10));
    if (car) {
      if (car.owner === req.user.id) {
        const updatedCar = Car.updateSellingPrice(parseInt(req.params.id, 10), req.body.price);
        return Response.customResponse(updatedCar, res, 200);
      }
      return Response.errorResponse(res, 'Unauthorised User', 401);
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }


  /**
     * Delete a specific car Ad
     * @static
     * @param {*} req
     * @param {*} res
     * @memberof CarController
   */

  static async deleteSaleAdById(req, res) {
    // eslint-disable-next-line radix
    if (req.user.isAdmin === true) {
      const isDeleted = await Car.delete(parseInt(req.params.id, 10));
      if (isDeleted === true) {
        return res.status(200).json({
          status: res.statusCode,
          data: 'Car Ad successfully deleted',
        });
      }
      return Response.errorResponse(res, 'Sale Ad Not Found', 404);
    }
    return Response.errorResponse(res, 'Forbidden', 403);
  }

  /**
     * Return a custom response
     * @static
     * @param {*} res the HTTP response object
     * @returns { Array } Returns an array of Objects
     * @memberof CarController
     */
  static response(arr, res) {
    if (arr.length > 0) {
      return res.status(200).json({
        status: res.statusCode,
        data: arr,
      });
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }
}

export default CarController;
