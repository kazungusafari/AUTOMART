import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import OrderController from '../controllers/OrderController';
import OrderValidation from '../validations/orderValidation';

const orderRoutes = express.Router();

const validation = [ValidationHandler.validate];


orderRoutes.post('/', OrderValidation.createOrder, validation, OrderController.createOrder);

export default orderRoutes;