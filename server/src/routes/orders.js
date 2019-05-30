import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import OrderController from '../controllers/OrderController';
import OrderValidation from '../validations/orderValidation';
import Authorization from '../middlewares/Authorization';

const orderRoutes = express.Router();
const validation = [ValidationHandler.validate];
orderRoutes.use(Authorization.authenticate);

orderRoutes.post('/', OrderValidation.createOrder, validation, OrderController.createOrder);
orderRoutes.patch('/:id/price', OrderValidation.updateOrderPrice, validation, OrderController.UpdatePrice);

export default orderRoutes;

/**
 * @swagger
 *
 * /api/v1/order/:
 *   post:
 *     description: Create a purchase order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: order object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewOrder'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *     security:
 *       - apiKey : []
 *
 *
 */

/**
 * @swagger
 * definitions:
 *   NewOrder:
 *     type: object
 *     required:
 *       - status
 *       - price
 *       - offeredPrice
 *       - carId
 *
 *     properties:
 *       offeredPrice:
 *         type: int
 *         format: int64
 *       status:
 *         type: string
 *         enum:
 *           - sold
 *           - available
 *       price:
 *         type: int
 *         format: int64
 *       carId:
 *         type: int
 *         format: int64
 *
 *
 *
 *
 *
 *
 *   Order:
 *     type: object
 *     required:
 *       - id
 *       - createdOn
 *       - carId
 *       - offeredPrice
 *       - price
 *       - status
 *
 *     properties:
 *       id:
 *         type: int
 *       createOn:
 *         type: datetime
 *       carId:
 *         type: int
 *         format: int64
 *       price:
 *         type: int
 *         format: int64
 *       offeredPrice:
 *         type: int
 *         format: int64
 *       status:
 *         type: string
 *
 *
 *
 */

/**
 * @swagger
 *
 * /api/v1/order/<:id>/price:
 *   patch:
 *     description: Update the price of a purchase order.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific order to update
 *         in: path
 *         type: int
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       403:
 *         description: Forbidden
 *     security:
 *       - apiKey : []
 *
 *
 */
