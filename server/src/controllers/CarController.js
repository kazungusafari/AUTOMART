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
  static async signup(req, res) {
    const user = User.findOne(req.body.user.id);

    if (user) {
      const saleAd = Car.create(req.body.user.id, req.body);
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
    return res.status(400).send({
      status: res.statusCode,
      error: 'User is not  registered',
    });
  }
}

export default CarController;