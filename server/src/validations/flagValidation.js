import {
  check,
} from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';


export default {
  createFlag: [
    check(['carId', 'reason', 'description'])
      .trim()
      .exists()
      .withMessage('All fields are required')
      .custom(value => notEmpty(value, 'All fields are required')),
    check(['carId'])
      .isInt()
      .withMessage('CarId can only be in the form of integers'),
    check(['reason', 'description'])
      .isString()
      .withMessage('Reason and Description should be of type string'),

  ],

};
