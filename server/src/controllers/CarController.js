/* eslint-disable class-methods-use-this */
import { config } from 'dotenv';
import User from '../models/user';
import Car from '../models/car';

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
      return res.status(201).send(
        {
          status: res.statusCode,
          data: {
            id: saleAd.id,
            email: user.email,
            createdOn: saleAd.createdOn,
            manufacturer: saleAd.manufacturer,
            model: saleAd.model,
            price: saleAd.price,
            state: saleAd.state,
            status: saleAd.status,
          },
        },
      );
    }
    return res.status(404).send({
      status: res.statusCode,
      error: 'User is not registered',
    });
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
      return CarController.customResponse(saleAd, res);
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'Sale Ad Not Found',
    });
  }

  /**
     * Return a custom response
     * @static
     * @param {Object} obj the car object
     * @param {*} res the HTTP response object
     * @returns { Object } Returns a car Object
     * @memberof CarController
     */
  static customResponse(obj, res) {
    return res.status(200).json({
      status: res.statusCode,
      data: {
        id: obj.id,
        owner: obj.owner,
        createdOn: obj.createdOn,
        manufacturer: obj.manufacturer,
        model: obj.model,
        price: obj.price,
        state: obj.state,
        status: obj.status,
        modifiedOn: obj.modifiedOn,
      },
    });
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
    // eslint-disable-next-line no-empty
    if (queryLength === 0) {
      if (req.user.isAdmin === true) {
        return CarController.getAllCars(res);
      }
      return res.status(403).json({
        status: res.statusCode,
        error: 'Forbidden',
      });
    }
    if (queryLength === 1 && req.query.status) {
      if (req.query.status === 'available') {
        const allUnsolds = Car.findAllByStatus(req.query.status);
        return CarController.response(allUnsolds, res);
      }
      return res.status(404).json({
        status: res.statusCode,
        error: 'Not found',
      });
    }
    if (queryLength === 3 && req.query.min_price && req.query.max_price && req.query.status) {
      const minPrice = req.query.min_price;
      const maxPrice = req.query.max_price;
      const allUnsolds = Car.findAllByPriceRange(minPrice, maxPrice, req.query.status);
      return CarController.response(allUnsolds, res);
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'Not found',
    });
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
        return CarController.customResponse(updatedCar, res);
      }
      return res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorised User',
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'Not Found',
    });
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
    return res.status(404).json({
      status: res.statusCode,
      error: 'Not found',
    });
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
        return CarController.customResponse(updatedCar, res);
      }
      return res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorised User',
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'Not Found',
    });
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
      if (isDeleted) {
        return res.status(200).json({
          status: res.statusCode,
          data: 'Car Ad successfully deleted',
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        message: 'Sale Ad Not Found',
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      error: 'Forbidden',
    });
  }
}

export default CarController;
