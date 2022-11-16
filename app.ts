import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes/mint';
import bodyParser from 'body-parser';

const app: Application = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true}));
// body-parser
// app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();

// routes
app.use('/', routes);

// start the server
app.listen(3008, () => {
  console.log(
    `server running : http://localhost:3002`
  );
});