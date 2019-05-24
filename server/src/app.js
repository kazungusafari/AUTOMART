import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';


config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));


app.use('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page Not Found',
}));



app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

export default app;