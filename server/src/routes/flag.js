import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import FlagController from '../controllers/FlagController';
import FlagValidation from '../validations/orderValidation';
import idValidation from '../validations/idValidation';

import Authorization from '../middlewares/Authorization';

const flagRoute = express.Router();
const validation = [ValidationHandler.validate];
flagRoute.use(Authorization.authenticate);

flagRoute.post('/', idValidation, FlagValidation.createFlag, validation, FlagController.createFlag);


export default flagRoute;
