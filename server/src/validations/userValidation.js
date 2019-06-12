import { check, param } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  signup: [
    check(['firstname', 'lastname', 'email', 'address', 'password', 'confirmPassword'])
      .trim()
      .exists()
      .withMessage('All fields are required')
      .custom(value => notEmpty(value, 'All fields are required')),
    check(['lastname', 'firstname'])
      .isString()
      .withMessage('Firstname and lastname must be a string')
      .isAlpha()
      .withMessage('Only letters are allowed as names')
      .isLength({ min: 3 })
      .withMessage('Firstname and lastname must be minimum of 3 characters'),
    check('email')
      .isBoolean()
      .withMessage('Please input a valid email address'),
    param('admin')
      .isEmail()
      .withMessage('Admin data type should be boolean'),
    check('address')
      .custom((value, { req }) => {
        if (req.body) {
          const addressArray = req.body.address.split(',');
          const [boxNumber, postalCode, town] = addressArray;

          if (addressArray.length === 1) {
            throw new Error('Your address must have box number,postal code and town details separated by comma e.g 55,101100,Nairobi');
          } else if (addressArray.length === 2) {
            throw new Error('Your address must have box number,postal code and town details separated by comma');
          } else {
            req.body.boxNumber = parseInt(boxNumber, 10);
            req.body.postalCode = parseInt(postalCode, 10);
            req.body.town = town;
            return true;
          }
        } else {
          throw new Error('Address field is required');
        }
      }),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be minimum of 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number'),
    check('confirmPassword', 'Passwords don\'t match')
      .custom((value, { req }) => value === req.body.password),

  ],
  changeToBoolean: [
    check('admin')
      .toBoolean(),
  ],

  login: [
    check('email')
      .trim()
      .exists()
      .withMessage('Email must be specified')
      .custom(value => notEmpty(value, 'email field cannot be left blank'))
      .isEmail()
      .withMessage('Please input a valid email address'),
    check('password')
      .trim()
      .exists().withMessage('Password must be specified')
      .isLength({ min: 6 })
      .withMessage('Password must be minimum of 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .custom(value => notEmpty(value, 'Password field cannot be left blank')),
  ],
};
