import { Router } from 'express';
import { postRent } from '../controllers/rentalsController.js';
import { validateRental } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateRental, postRent);

export default rentalsRouter;