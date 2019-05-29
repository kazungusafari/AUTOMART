/* eslint-disable no-shadow */
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
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
      const isUserRegistered = User.create(req.query, req.body);
      const token = Authorization.generateToken(isUserRegistered);
      return res.status(201).send(
        {
          status: res.statusCode,
          data: {
            token,
            id: isUserRegistered.id,
            email: isUserRegistered.email,
            firstname: isUserRegistered.firstname,
            lastname: isUserRegistered.lastname,
            isAdmin: JSON.parse(isUserRegistered.isAdmin),
          },
        },
      );
    }


    return res.status(400).send({
      status: res.statusCode,
      error: 'Email is already registered',
    });
  }


  /**
   * Logs in a user
   * @method login
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */

  static async login(req, res) {
    const { email, password } = req.body;
    const userFound = User.findOne(email);


    if (!userFound) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Email is not registered',
      });
    }
    const isPasswordValid = UserController.verifyPassword(password, userFound.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Password is wrong',
      });
    }
    const token = Authorization.generateToken(userFound);
    return res.status(200).send(
      {
        status: res.statusCode,
        data: {
          token,
          id: userFound.id,
          email: userFound.email,
          firstname: userFound.firstname,
          lastname: userFound.lastname,
          isAdmin: JSON.parse(userFound.isAdmin),
        },
      },
    );
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
