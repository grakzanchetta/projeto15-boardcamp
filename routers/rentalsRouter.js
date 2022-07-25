import { Router } from 'express';
import { postRent, getRentals, finishRental, deleteRental } from '../controllers/rentalsController.js';
import { validateRental } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateRental, postRent);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals/:id/return', finishRental);
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;