import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import CarController from '../controllers/CarController';
import CarValidation from '../validations/carValidation';
import Trim from '../middlewares/Trim';
import Authorization from '../middlewares/Authorization';

const carRoutes = express.Router();

const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];


carRoutes.post('/', Authorization.authenticate, CarValidation.createSaleAd, validation, CarController.createSaleAd);

export default carRoutes;
