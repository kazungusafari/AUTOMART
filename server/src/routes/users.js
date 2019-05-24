import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import UserController from '../controllers/UserController';
import UserValidation from '../validations/userValidation';
import Trim from '../middlewares/Trim';

const userRoutes = express.Router();

const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];


/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - lastname
 *       - firstname
 *       - email
 *       - password
 *       - address
 *     properties:
 *       lastname:
 *         type: string
 *       firstname:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       isAdmin:
 *         type: boolean
 *         default: false
 *       address:
 *         $ref: '#/definitions/AddressInfo'
 *
 *   AddressInfo:
 *     type: object
 *     properties:
 *       boxNunber:
 *         type: int
 *         format: int64
 *       postalCode:
 *         type: int
 *         format: int64
 *       town:
 *         type: string
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
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - isAdmin
 *       - email
 *       - token
 *       - lastname
 *       - firstname
 *     properties:
 *       id:
 *         type: int
 *         format: int64
 *       isAdmin:
 *         type: boolean
 *         default: false
 *       email:
 *         type: string
 *         format: email
 *       lastname:
 *         type: string
 *       firstname:
 *         type: string
 *       token:
 *         type: any
 *
 *
 */


/**
 * @swagger
 *
 * /api/v1/auth/signup:
 *   post:
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       201:
 *         description: return some information about the created user
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: invalid input
 *         schema:
 *           $ref: '#/definitions/Errors'
 *
 *
 */


userRoutes.post('/signup', UserValidation.signup, validation, UserController.signup);

export default userRoutes;
