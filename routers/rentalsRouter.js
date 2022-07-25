import { Router } from 'express';
import { postRent, getRentals, finishRental } from '../controllers/rentalsController.js';
import { validateRental } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateRental, postRent);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals/:id/return', finishRental);

export default rentalsRouter;