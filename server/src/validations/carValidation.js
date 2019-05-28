import { check, param , query} from 'express-validator/check';
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
      .isInt()
      .withMessage('Price can only be in the form of integers'),
  ],
  getSaleAdById: [
    param('id')
      .exists()
      .withMessage('Car id is required')
      .custom(value => notEmpty(value, 'Car id is required'))
      .isInt()
      .withMessage('Car id  can only be in the form of integers'),
  ],
  getAllSaleAds: [
    query(['status', 'max_price', 'max_price'])
      .isString()
      .withMessage('Your query  should be of type string')
      .optional(),
  ],
};
