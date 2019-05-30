import {
 check, param, body , header 
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
    param('id')
      .exists()
      .withMessage('Order id is required')
      .custom(value => notEmpty(value, 'Order id is required'))
      .isInt()
      .withMessage('Order id  can only be in the form of integers'),
    body('price')
      .exists()
      .withMessage('Price is required')
      .custom(value => notEmpty(value, 'Price is required'))
      .isInt()
      .withMessage('Price can only be in the form of integers'),

  ],
};
