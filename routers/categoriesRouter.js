import { Router } from 'express';

import { validateCategory } from '../middlewares/categoriesMiddleware.js';
import { postCategory, getCategories } from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.post('/categories', validateCategory, postCategory);
categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;