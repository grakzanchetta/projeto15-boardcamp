import customersSchema from '../schemas/customersSchema.js';

export function validateCustomer(request, response, next){
    const customer = request.body;
    const validation = customersSchema.validate(customer);
    if(validation.error){
        return response.status(400).send(validation.error)
    }
    next();
}