import { config } from 'dotenv';
import User from '../models/user';
import Authorization from '../middlewares/Authorization';

config();


/**
 *
 * @class UserController
 */
class UserController {
  /**
   * Create a new User
   * @static
   * @param {object} req
   * @param {object} res
   * @returns { Object }
   * @memberof UserController
   */
  static async signup(req, res) {
    const isUserRegistered = User.findOne(req.body.email);

    if (!isUserRegistered) {
      const user = User.create(req.query, req.body);
      const token = Authorization.generateToken(user);
      return res.status(201).send(
        {
          status: res.statusCode,
          data: {
            token,
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            isAdmin: JSON.parse(user.isAdmin),
          },
        },
      );
    }


    return res.status(400).send({
      status: res.statusCode,
      error: 'Email is already registered',
    });
  }
}

export default UserController;
