import rentalsSchema from '../schemas/rentalsSchema.js';

export function validateRental (request, response, next){
    const rental = request.body;
    const validation = rentalsSchema.validate(rental);
    if (validation.error){
        return response.sendStatus(400);
    }

    next();
}