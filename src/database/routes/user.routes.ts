import * as express from 'express';
import UserController from '../controllers/user.controllers';

const userControllers = new UserController();

const userRoute = express.Router();

userRoute.get('/', userControllers.getAll);
userRoute.get('/:id', userControllers.getUser);
userRoute.post('/', userControllers.createUser);
userRoute.post('/login', userControllers.login);

export default userRoute;
