import express from 'express';
import userRoute from './database/routes/user.routes';
import clubRoute from './database/routes/club.routes';
import hobbyRoute from './database/routes/hobby.routes';

const app = express();

app.use(express.json());

app.use('/user', userRoute);
app.use('/club', clubRoute);
app.use('/hobby', hobbyRoute)

export default app;