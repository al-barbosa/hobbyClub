import * as express from 'express';
import UserController from '../controllers/user.controllers';

const userControllers = new UserController();

const userRoute = express.Router();

userRoute.get('/', userControllers.getAll);

export default userRoute;
