import { Router } from 'express';

import { validateCustomer } from '../middlewares/customersMiddleware.js';
import { postCustomer } from '../controllers/customerController.js';

const customersRouter = Router();

customersRouter.post('/customers', validateCustomer, postCustomer);

export default customersRouter;