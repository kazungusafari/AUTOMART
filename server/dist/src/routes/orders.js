'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ValidationHandler = require('../middlewares/ValidationHandler');

var _ValidationHandler2 = _interopRequireDefault(_ValidationHandler);

var _OrderController = require('../controllers/OrderController');

var _OrderController2 = _interopRequireDefault(_OrderController);

var _orderValidation = require('../validations/orderValidation');

var _orderValidation2 = _interopRequireDefault(_orderValidation);

var _idValidation = require('../validations/idValidation');

var _idValidation2 = _interopRequireDefault(_idValidation);

var _Authorization = require('../middlewares/Authorization');

var _Authorization2 = _interopRequireDefault(_Authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderRoutes = _express2.default.Router();
var validation = [_ValidationHandler2.default.validate];
orderRoutes.use(_Authorization2.default.authenticate);

orderRoutes.post('/', _orderValidation2.default.createOrder, validation, _OrderController2.default.createOrder);
orderRoutes.patch('/:id/price', _idValidation2.default.verifyId, _orderValidation2.default.updateOrderPrice, validation, _OrderController2.default.UpdatePrice);

exports.default = orderRoutes;

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
 *         required: true
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *       - name : price
 *         description: New offered price
 *         in : body
 *         type: int
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