import * as express from 'express';
import ClubController from '../controllers/club.controllers';

const clubController = new ClubController();

const clubRoute = express.Router();

clubRoute.get('/', clubController.getAll);
clubRoute.post('/', clubController.createClub);
clubRoute.get('/:id', clubController.getClub);
clubRoute.post('/:id', clubController.createHobby);
clubRoute.patch('/:id/:hobby', clubController.finishHobby);

export default clubRoute;
