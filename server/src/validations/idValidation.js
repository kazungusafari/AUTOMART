import {
  buildCheckFunction,
} from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

const checkMultipleLocations = buildCheckFunction(['query', 'body', 'params']);

export default {

  verifyId: [
    checkMultipleLocations(['id'])
      .exists()
      .withMessage('Id is required')
      .custom(value => notEmpty(value, 'Id is required'))
      .isInt()
      .withMessage('Id can only be in the form of integers')
      .toInt(),
  ],
};
