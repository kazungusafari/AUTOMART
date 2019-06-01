import {
  check, body,
} from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';


export default {
  createOrder: [
    check(['offeredPrice', 'price', 'status', 'carId'])
      .trim()
      .exists()
      .withMessage('All fields are required')
      .custom(value => notEmpty(value, 'All fields are required')),
    check(['offeredPrice', 'price', 'carId'])
      .isInt()
      .withMessage('Price and carId can only be in the form of integers'),
    check('status')
      .isString()
      .withMessage('Status can only be of type string'),

  ],
  updateOrderPrice: [
    body(['price'])
      .exists()
      .withMessage('price is required')
      .custom(value => notEmpty(value, 'price is required'))
      .isInt()
      .withMessage('Price can only be in the form of integers')
      .toInt(),
  ],
};
