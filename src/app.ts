import express from 'express';
import userRoute from './database/routes/user.routes';
import clubRoute from './database/routes/club.routes';

const app = express();

app.use(express.json());

app.use('/user', userRoute);
app.use('/club', clubRoute);

export default app;