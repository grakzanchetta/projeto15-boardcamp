import database from '../dbstrategy/postgres.js';

export async function postGames (request, response){
    const { name, image, stockTotal, categoryId, pricePerDay } = request.body;
    try {
        
    } catch (error) {
        response.sendStatus(500);
    }
}