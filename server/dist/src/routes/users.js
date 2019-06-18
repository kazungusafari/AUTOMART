'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ValidationHandler = require('../middlewares/ValidationHandler');

var _ValidationHandler2 = _interopRequireDefault(_ValidationHandler);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _userValidation = require('../validations/userValidation');

var _userValidation2 = _interopRequireDefault(_userValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoutes = _express2.default.Router();

var validation = [_ValidationHandler2.default.validate];

userRoutes.post('/signup', _userValidation2.default.changeToBoolean, _userValidation2.default.signup, validation, _UserController2.default.signup);
userRoutes.post('/login', _userValidation2.default.login, validation, _UserController2.default.login);

exports.default = userRoutes;

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
 *       confirmPassword:
 *         type: string
 *         format: password
 *       isAdmin:
 *         type: boolean
 *         default: false
 *       address:
 *         type: string
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
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/Errors'
 *
 *
 */

/**
 * @swagger
 *
 * /api/v1/auth/login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref:  '#/definitions/User'
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/Errors'
 *       401:
 *         description: Unauthorised
 *
 *       404:
 *         description: Not found
 *
 */