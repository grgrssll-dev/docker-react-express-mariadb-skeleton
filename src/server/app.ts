import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const ExpressConfig = (): Application => {
  const app = express();
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cookieParser());
  app.use(cors());

  return app
}

export default ExpressConfig
