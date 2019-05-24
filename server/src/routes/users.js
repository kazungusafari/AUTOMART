
import express from 'express';



const userRoutes = express.Router();

userRoutes.post('/signup',console.log("This is signup endpoint"));

export default userRoutes;