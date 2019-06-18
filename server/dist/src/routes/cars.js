'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ValidationHandler = require('../middlewares/ValidationHandler');

var _ValidationHandler2 = _interopRequireDefault(_ValidationHandler);

var _CarController = require('../controllers/CarController');

var _CarController2 = _interopRequireDefault(_CarController);

var _carValidation = require('../validations/carValidation');

var _carValidation2 = _interopRequireDefault(_carValidation);

var _Authorization = require('../middlewares/Authorization');

var _Authorization2 = _interopRequireDefault(_Authorization);

var _idValidation = require('../validations/idValidation');

var _idValidation2 = _interopRequireDefault(_idValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-irregular-whitespace */
var carRoutes = _express2.default.Router();
var validation = [_ValidationHandler2.default.validate];
carRoutes.use(_Authorization2.default.authenticate);

carRoutes.post('/', _carValidation2.default.createSaleAd, validation, _CarController2.default.createSaleAd);
carRoutes.get('/:id', _idValidation2.default.verifyId, validation, _CarController2.default.getSaleAdById);
carRoutes.get('/', validation, _CarController2.default.getAllSaleAds);
carRoutes.patch('/:id/status', _idValidation2.default.verifyId, validation, _CarController2.default.markAdAsSold);
carRoutes.patch('/:id/price', _idValidation2.default.verifyId, validation, _CarController2.default.UpdatePrice);
carRoutes.delete('/:id', _idValidation2.default.verifyId, validation, _CarController2.default.deleteSaleAdById);

exports.default = carRoutes;

/**
 * @swagger
 * definitions:
 *   NewCar:
 *     type: object
 *     required:
 *       - state
 *       - status
 *       - price
 *       - manufacturer
 *       - model
 *       - bodyType
 *       - apiKey
 *     properties:
 *       state:
 *         type: string
 *         enum:
 *           - used
 *           - new
 *       status:
 *         type: string
 *         enum:
 *           - sold
 *           - available
 *       price:
 *         type: int
 *         format: int64
 *       manufacturer:
 *         type: string
 *       model:
 *         type: string
 *       bodyType:
 *         type: string
 *       apiKey:
 *         name: authorization
 *         in: header
 *         type:
 *
 *
 *   Errors:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         location:
 *           type: string
 *           description: source of the data
 *         param:
 *           type: string
 *           description: name of the field
 *         value:
 *           type: string
 *           description: value of the field
 *         msg:
 *           type: string
 *           description: information on the error
 *
 *
 *   Car:
 *     type: object
 *     required:
 *       - id
 *       - createdOn
 *       - email
 *       - manufacturer
 *       - model
 *       - price
 *       - status
 *       - state
 *     properties:
 *       id:
 *         type: int
 *       createOn:
 *         type: datetime
 *       email:
 *         type: string
 *         format: email
 *       manufacturer:
 *         type: string
 *       model:
 *         type: string
 *       status:
 *         type: string
 *       state:
 *         type: string
 *
 *
 */

/**
 * @swagger
 *
 * /api/v1/car:
 *   post:
 *     description: Creates a sale Ad
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewCar'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/Car'
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
 *
 * /api/v1/car/<:id>/:
 *   delete:
 *     description: Delete a specific car Ad.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to delete
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

/**
 * @swagger
 *
 * /api/v1/car/<:id>/:
 *   get:
 *     description: Return  a specific car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to return
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
 *           $ref: '#/definitions/Car'
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
 * /api/v1/car?status=available:
 *   get:
 *     description: Returns a list of all unsold cars.
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               description: All unsold cars.
 *               items:
 *                 type: object
 *                 proprties:
 *                     $ref: '#/definitions/Car'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *     security:
 *       - apiKey : []
 */

/**
 * @swagger
 * /api/v1/car?status=available&min_price=XXXValue​&max_price=XXXValue:
 *   get:
 *     description: Returns a list of all unsold cars within a price range
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               description: all unsold cars within a price range
 *               items:
 *                 type: object
 *                 proprties:
 *                     $ref: '#/definitions/Car'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *     security:
 *       - apiKey : []
 */
/**
 * @swagger
 *
 * /api/v1/car/<:id>/price:
 *   patch:
 *     description: Update the price of a car..
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to update
 *         in: path
 *         type: int
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *       - name : price
 *         description: New  price
 *         in : body
 *         type: int
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Car'
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
/**
 * @swagger
 *
 * /api/v1/car/<:id>/status:
 *   patch:
 *     description: Mark a posted car Ad as sold.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to update
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
 *           $ref: '#/definitions/Car'
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
 * /api/v1/car/:
 *   get:
 *     description: Returns a list of all posted ads whether sold or available.
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               description: all posted ads whether sold or available.
 *               items:
 *                 type: object
 *                 proprties:
 *                     $ref: '#/definitions/Car'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *     security:
 *       - apiKey : []
 */
/**
 * @swagger
 * Securitydefinitions:
 *   APIKeyHeader:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *
 *
 *
 *
 *
 */