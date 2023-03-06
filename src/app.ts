import express from 'express'
import {Router} from './routes';
import bodyParser from 'body-parser';

const app = express()
const port = 3000;

app.use(
  bodyParser.json()
);

Router(app);

const iniciar = () : void => {
  try {
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error);
  }
};

iniciar();