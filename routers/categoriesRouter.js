import { Router } from 'express';

import { validateCategory } from '../middlewares/categoriesMiddleware.js';
import { postCategories, getCategories } from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.post('/categories', validateCategory, postCategories);
categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;