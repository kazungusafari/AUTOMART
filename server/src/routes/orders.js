import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import OrderController from '../controllers/OrderController';
import OrderValidation from '../validations/orderValidation';
import Authorization from '../middlewares/Authorization';

const orderRoutes = express.Router();

const validation = [ValidationHandler.validate];


orderRoutes.post('/', Authorization.authenticate, OrderValidation.createOrder, validation, OrderController.createOrder);

export default orderRoutes;
