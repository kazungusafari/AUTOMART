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
    const user = await User.findOne(req.user.email);
    // eslint-disable-next-line radix
    const saleAd = await Car.findOne(parseInt(req.params.id));


    if (saleAd) {
      return res.status(200).json({
        status: res.statusCode,
        data: {
          id: saleAd.id,
          owner: user.id,
          createdOn: saleAd.createdOn,
          manufacturer: saleAd.manufacturer,
          model: saleAd.model,
          price: saleAd.price,
          state: saleAd.state,
          status: saleAd.status,
        },
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'Sale Ad Not Found',
    });
  }
}

export default CarController;
