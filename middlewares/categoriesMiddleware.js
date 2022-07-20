import categoriesSchema from '../schemas/categoriesSchema.js';

export function validateCategory(request, response, next){
    const category = request.body;
    const validation = categoriesSchema.validate(category);
    if(validation.error){
        return response.sendStatus(400)
    }
    next();
}