import * as express from 'express';
import HobbyController from '../controllers/hobby.controller';
import TokenHandler from '../helper/TokenHelper';

const hobbyController = new HobbyController();
const tokenHandler = new TokenHandler();

const hobbyRoute = express.Router();

// userRoute.get('/:id', tokenHandler.validateToken, HobbyController.getHobby);
hobbyRoute.get('/:id', hobbyController.getHobby);
hobbyRoute.post('/:id/:user', tokenHandler.validateToken, hobbyController.postMessage);
hobbyRoute.delete('/:messageId', tokenHandler.validateToken, hobbyController.deleteMessage);

export default hobbyRoute;