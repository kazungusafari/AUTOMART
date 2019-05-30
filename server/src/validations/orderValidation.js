import { check, param } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createOrder: [
    check(['offeredPrice', 'price', 'status'])
      .trim()
      .exists()
      .withMessage('All fields are required')
      .custom(value => notEmpty(value, 'All fields are required')),
    check(['offeredPrice', 'price'])
      .isInt()
      .withMessage('Price can only be in the form of integers'),
    check('status')
      .isString()
      .withMessage('Status can only be of type string'),
  ],
  updateOrderPrice: [
    param('id')
      .exists()
      .withMessage('Order id is required')
      .custom(value => notEmpty(value, 'Order id is required'))
      .isInt()
      .withMessage('Order id  can only be in the form of integers'),
  ],
};
