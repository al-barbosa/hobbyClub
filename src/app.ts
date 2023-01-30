import express from 'express';
import userRoute from './database/routes/user.routes';

const app = express();

app.use(express.json());

app.use('/users', userRoute);

export default app;