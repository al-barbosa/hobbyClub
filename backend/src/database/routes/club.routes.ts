import * as express from 'express';
import ClubController from '../controllers/club.controllers';
import TokenHandler from '../helper/TokenHelper';

const clubController = new ClubController();

const clubRoute = express.Router();
const tokenHandler = new TokenHandler();

clubRoute.get('/', clubController.getAll);
clubRoute.post('/', tokenHandler.validateToken, clubController.createClub);
clubRoute.get('/:id', clubController.getClub);
clubRoute.get('/:id/messages', clubController.getMessages);
clubRoute.post('/:id/messages', clubController.getMessages);
clubRoute.post('/:id', tokenHandler.validateToken, clubController.createHobby);
clubRoute.patch('/:id/:hobby', tokenHandler.validateToken, clubController.finishHobby);

export default clubRoute;
