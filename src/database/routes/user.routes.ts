import * as express from 'express';
import UserController from '../controllers/user.controllers';
import TokenHandler from '../helper/TokenHelper';

const userControllers = new UserController();
const tokenHandler = new TokenHandler();

const userRoute = express.Router();

userRoute.get('/', userControllers.getAll);
userRoute.get('/:id', userControllers.getUser);
userRoute.post('/:id/:club', tokenHandler.validateToken, userControllers.joinClub);
userRoute.post('/', userControllers.createUser);
userRoute.post('/login', userControllers.login);

export default userRoute;
