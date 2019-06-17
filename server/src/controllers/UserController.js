/* eslint-disable no-undef-init */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/user';
import Address from '../models/address';

import Authorization from '../middlewares/Authorization';
import Response from './utils/responseFormatter';

config();


/**
 *
 * @class UserController
 */
class UserController {
  /**
   * Create a new User
   * @static
   * @param {object} req the http request object
   * @param {object} res the http response object
   * @returns { Object } the created user object
   * @memberof UserController
   */
  static async signup(req, res) {
    try {
      let registeredUser = null;
      const { rows } = await User.create(req.query.admin, req.body);
      registeredUser = rows[0];
      const token = Authorization.generateToken(registeredUser);
      registeredUser.token = token;
      const response = await Address.create(registeredUser.id, req.body);
      return Response.customResponse(registeredUser, res, 201);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return Response.errorResponse(res, 'Email is already registered', 400);
      }

      return Response.errorResponse(res, error, 400);
    }
  }


  /**
   * Logs in a user
   * @method login
   * @memberof UserController
   * @param {object} req the http request object
   * @param {object} res the http response object
   * @returns {object} user login object
   */

  static async login(req, res) {
    const { email, password } = req.body;
    let userFound = undefined;
    const { rows } = await User.findOne(email);
    userFound = rows[0];
    if (userFound === undefined) {
      return Response.errorResponse(res, 'Email is not registered', 404);
    }
    const isPasswordValid = UserController.verifyPassword(password, userFound.password);

    if (!isPasswordValid) {
      return Response.errorResponse(res, 'Password is wrong', 401);
    }
    const token = Authorization.generateToken(userFound);
    userFound.token = token;
    return Response.customResponse(userFound, res, 200);
  }

  /**
   * @method verifyPassword
   * @memberof UserController
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default UserController;
