import express from 'express';
import userRoutes from './users';
import carRoutes from './cars';


const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.json({
  status: 200,
  message: 'Welcome to AutoMart API',
}));

apiRoutes.get('/v1', (req, res) => res.json({
  status: 200,
  message: 'Welcome to version 1 of AutoMart API',
}));

apiRoutes.use('/v1/auth', userRoutes);
apiRoutes.use('/v1/car', carRoutes);


export default apiRoutes;