import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createSaleAd: [
    check(['manufacturer', 'price', 'state', 'status', 'model', 'bodyType'])
      .trim()
      .exists()
      .withMessage('All fields are required')
      .custom(value => notEmpty(value, 'All fields are required')),
    check(['manufacturer', 'state', 'status', 'model', 'bodyType'])
      .isString()
      .withMessage('All fields except price are suppose to be strings'),
    check('price')
      .custom((value, { req }) => {
        if (req.body) {
          const addressArray = req.body.address.split(',');
          const [boxNumber, postalCode, town] = addressArray;

          if (addressArray.length === 1) {
            throw new Error('Your address must have box number,postal code and town details separated by comma');
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
    ],
};