import * as express from 'express';
import ClubController from '../controllers/club.controllers';

const clubController = new ClubController();

const clubRoute = express.Router();

clubRoute.get('/', clubController.getAll);

export default clubRoute;
