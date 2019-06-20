import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import FlagController from '../controllers/FlagController';
import FlagValidation from '../validations/flagValidation';
import Authorization from '../middlewares/Authorization';

const flagRoute = express.Router();
const validation = [ValidationHandler.validate];
flagRoute.use(Authorization.authenticate);

flagRoute.post('/', FlagValidation.createFlag, validation, FlagController.createFlag);


export default flagRoute;

/**
 * @swagger
 *
 * /api/v1/flag/:
 *   post:
 *     description: Flag​ a posted AD as fraudulent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: flag
 *         description: flag object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewFlag'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/Flag'
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
 *   NewFlag:
 *     type: object
 *     required:
 *       - carId
 *       - reason
 *       - description
 *
 *
 *     properties:
 *       carId:
 *         type: int
 *         format: int64
 *       reason:
 *         type: string
 *       description:
 *         type: string
 *
 *   Flag:
 *     type: object
 *     required:
 *       - id
 *       - created_date
 *       - car_id
 *       - reason
 *       - description
 *
 *     properties:
 *       id:
 *         type: int
 *       create_date:
 *         type: datetime
 *       car_id:
 *         type: int
 *         format: int64
 *       reason:
 *         type: string
 *       description:
 *         type: string
 *
 *
 *
 */
