import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * @exports
 * @class Authorization
 */
class Authorization {
  /**
     * @method getToken
     * @memberof Authorization
     * @param {object} req
     * @returns {string} token
     */
  static getToken(req) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    return token;
  }

  /**
     * @method generateToken
     * @memberof Authorization
     * @param {object} user
     * @returns {string} token
     * expires in 24 hours
     */
  static generateToken({ ...user }) {
    const token = jwt.sign({ user },
      process.env.SECRET, {
        expiresIn: 86400,
      });

    return token;
  }

  // eslint-disable-next-line consistent-return
  static async authenticate(req, res, next) {
    try {
      const token = Authorization.getToken(req);
      if (!token) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized user',
        });
      }
      const decoded = await jwt.verify(token, process.env.SECRET);
      const user = User.findOne(decoded.user.email);

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: 'Token is invalid',
        });
      }
      req.user = decoded.user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 401,
          error: 'Token Expired',
        });
      }
    }
  }
}

export default Authorization;
