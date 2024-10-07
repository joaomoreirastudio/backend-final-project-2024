import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import MovieRouter from './routers/movieRouter.js';
import { setupSwagger } from './config/swagger.js';

import { Router } from 'express'; // Import Router from express
import authRouter from './routers/authRouter.js';

dotenv.config();
const PORT = process.env.PORT || 7878;

// App Creation
const app = express();
app.use(fileUpload());
app.use('/static', express.static('static'));

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', MovieRouter);

const sartApp = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log('Sucessfully connected to DB');

    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'prod') {
        console.log(`Server is running in production mode on port ${PORT}`);
      } else {
        console.log(`Server is running in development mode on port ${PORT}`);
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error connecting to database', error.message);
    }
  }
};

sartApp();
setupSwagger(app);
