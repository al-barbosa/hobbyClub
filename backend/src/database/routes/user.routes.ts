import * as express from 'express';
import UserController from '../controllers/user.controllers';
import TokenHandler from '../helper/TokenHelper';

const userControllers = new UserController();
const tokenHandler = new TokenHandler();

const userRoute = express.Router();

userRoute.get('/', userControllers.getAll);
userRoute.get('/:id', tokenHandler.validateToken, userControllers.getUser);
userRoute.get('/:id/messages', tokenHandler.validateToken, userControllers.getMessages);
userRoute.post('/:id/:club', tokenHandler.validateToken, userControllers.joinClub);
userRoute.delete('/:id/:club', tokenHandler.validateToken, userControllers.leftClub);
userRoute.post('/', userControllers.createUser);
userRoute.post('/login', userControllers.login);

export default userRoute;
