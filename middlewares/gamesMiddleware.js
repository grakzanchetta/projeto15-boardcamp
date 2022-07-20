import gamesSchema from "../schemas/gamesSchema.js";

export function validateGame (request, response, next){
    const game = request.body;
    const validation = gamesSchema.validate(game);
    if(validation.error){
        return response.sendStatus(400);
    }
    next();
}