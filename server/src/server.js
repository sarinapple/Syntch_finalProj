import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';

import userRouter from './routes/userRouter.js';
import levelRouter from './routes/levelRouter.js';
import taskRouter from './routes/taskRouter.js';
import scoreRouter from './routes/scoreRouter.js';
import connectDB from './lib/db.js';
import checkAuth from './middleware/checkAuth.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
connectDB();

// Endpoint to retrieve data from MongoDB
app.get('/levels', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('levels');
    const result = await collection.findOne();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data from database');
  }
});

app.use('/user', checkAuth, userRouter);
app.use('/level', checkAuth, levelRouter);
app.use('/task', checkAuth, taskRouter);
app.use('/score', checkAuth, scoreRouter);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`:+1: Server is running on http://localhost:${port}`);
});
