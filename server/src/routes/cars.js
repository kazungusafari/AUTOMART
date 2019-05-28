import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import CarController from '../controllers/CarController';
import CarValidation from '../validations/carValidation';
import Authorization from '../middlewares/Authorization';

const carRoutes = express.Router();

const validation = [ValidationHandler.validate, ValidationHandler.isEmptyReq];

carRoutes.post('/', Authorization.authenticate, CarValidation.createSaleAd, validation, CarController.createSaleAd);
carRoutes.get('/:id/', Authorization.authenticate, CarValidation.getSaleAdById, validation, CarController.getSaleAdById);
carRoutes.get('/', Authorization.authenticate, CarValidation.getAllSaleAds, validation, CarController.getAllSaleAds);

export default carRoutes;


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
 *   get:
 *     description: Returns a single sale Ad
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the sale Ad to return
 *         in: path
 *         required: true
 *         type: int
 *         schema:
 *           $ref: '#/definitions/Car'
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
