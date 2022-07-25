import { Router } from 'express';
import { postRent, getRentals } from '../controllers/rentalsController.js';
import { validateRental } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateRental, postRent);
rentalsRouter.get('/rentals', getRentals);

export default rentalsRouter;