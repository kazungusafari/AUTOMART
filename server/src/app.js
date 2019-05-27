import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import apiRoutes from './routes';
import ErrorHandler from './middlewares/ErrorHandler';
import swaggerDoc from './swaggerDocs';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

swaggerDoc(app);

app.use('/api', apiRoutes);
app.use('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page Not Found',
}));


app.use(ErrorHandler.sendError);

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

export default app;
