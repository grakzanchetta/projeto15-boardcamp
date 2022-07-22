import { Router } from 'express';

import { validateCustomer } from '../middlewares/customersMiddleware.js';
import { postCustomer, updateCustomer, getCustomers, getCustomerbyId } from '../controllers/customerController.js';

const customersRouter = Router();

customersRouter.post('/customers', validateCustomer, postCustomer);
customersRouter.put('/customers/:id', validateCustomer, updateCustomer);
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerbyId);

export default customersRouter;