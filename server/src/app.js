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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

swaggerDoc(app);

app.use('/api', apiRoutes);
app.use('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page Not Found',
}));


app.use(ErrorHandler.sendError);
app.use(cors());
app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

export default app;
