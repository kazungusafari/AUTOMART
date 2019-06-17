/* eslint-disable prefer-destructuring */
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
   * @param {object} req the http request object
   * @param {object} res the http response object
   * @returns { Object } the posted sale Ad object
   * @memberof UserController
   */
  static async createSaleAd(req, res) {
    let user = null;
    const { rows } = await User.findOne(req.user.email);
    user = rows[0];
    if (user !== null) {
      let saleAd = null;
      console.log(req.user.id);
      const response = await Car.create(req.user.id, req.body);
      saleAd = response.rows[0];
      if (saleAd !== null) {
        return Response.customResponse(saleAd, res, 201);
      }
    }
    return Response.errorResponse(res, 'User is not registered', 404);
  }

  /**
     * Get a car sale Ad by id
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Object } Returns a sale Ad object
     * @memberof CarController
   */

  static async getSaleAdById(req, res) {
    let saleAd = null;
    const response = await Car.findOneCar(req.params.id);
    saleAd = response.rows[0];
    if (saleAd) {
      return Response.customResponse(saleAd, res, 200);
    }
    return Response.errorResponse(res, 'Sale Ad Not Found', 404);
  }


  /**
     * Get all unsold car Ads
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Array } Returns an array of Objects
     * @memberof CarController
     */
  static async getAllSaleAds(req, res) {
    // eslint-disable-next-line radix
    const queryLength = parseInt(Object.keys(req.query).length);
    // eslint-disable-next-line camelcase
    const { max_price, min_price, status } = req.query;
    if (queryLength === 0) {
      if (req.user.isadmin === true) {
        return CarController.getAllCars(res);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    if (queryLength === 1 && status) {
      if (req.query.status === 'available') {
        const { rows } = await Car.findAllByStatus(req.query.status);
        return CarController.response(rows, res);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    if (queryLength === 3 && min_price && max_price && status) {
      let allUnsoldByPriceRange = null;
      const response = await Car.findAllByPriceRange(min_price, max_price, status);
      allUnsoldByPriceRange = response.rows;
      if (allUnsoldByPriceRange !== null) {
        return CarController.response(allUnsoldByPriceRange, res);
      }
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
    let car = null;
    const { rows } = await Car.findOneCar(req.params.id);
    car = rows[0];
    if (car) {
      if (car.owner === req.user.id) {
        let updatedCar = null;
        const response = await Car.updateStatus(req.params.id);
        updatedCar = response.rows[0];
        return Response.customResponse(updatedCar, res, 200);
      }
      return Response.errorResponse(res, 'Unauthorised User', 401);
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }

  /**
     * Return all posted ads whether sold or available.
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Array } Returns an array of all posted ads
     * @memberof CarController
     */
  static async getAllCars(res) {
    try {
      const { rows } = await Car.findAll();
      return CarController.response(rows, res);
    } catch (error) {
      return Response.errorResponse(res, error, 400);
    }
  }

  /**
     * Update the price of a car.
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Object } Returns the updated car Object
     * @memberof CarController
     */
  static async UpdatePrice(req, res) {
    let car = null;
    const { rows } = await Car.findOneCar(req.params.id);
    car = rows[0];
    if (car) {
      if (car.owner === req.user.id) {
        let updatedCar = null;
        const response = await Car.updateSellingPrice(req.params.id, req.body.price);
        updatedCar = response.rows[0];
        if (updatedCar !== null) {
          return Response.customResponse(updatedCar, res, 200);
        }
      }
      return Response.errorResponse(res, 'Unauthorised User', 401);
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }


  /**
     * Delete a specific car Ad
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @memberof CarController
   */

  static async deleteSaleAdById(req, res) {
    // eslint-disable-next-line radix
    if (req.user.isadmin === true) {
      let deletedCar = null;
      const { rows } = await Car.delete(req.params.id);
      deletedCar = rows[0];
      if (deletedCar) {
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
