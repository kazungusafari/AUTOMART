import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import OrderController from '../controllers/OrderController';
import OrderValidation from '../validations/orderValidation';
import Authorization from '../middlewares/Authorization';

const orderRoutes = express.Router();
const validation = [ValidationHandler.validate];
orderRoutes.use(Authorization.authenticate);

orderRoutes.post('/', OrderValidation.createOrder, validation, OrderController.createOrder);
orderRoutes.post('/:id/price', OrderValidation.updateOrderPrice, validation, OrderController.UpdatePrice);

export default orderRoutes;
