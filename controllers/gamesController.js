import database from '../dbstrategy/postgres.js';

export async function postGame (request, response){
    const { name, image, stockTotal, categoryId, pricePerDay } = request.body;
    try {
        const searchCategory = await database.query('SELECT id FROM categories WHERE id = $1', [categoryId]);
        if (searchCategory.rowCount === 0){
            return response.sendStatus(400);
        }
        const gameExists = await database.query('SELECT id FROM games WHERE name = $1', [name]);
        if(gameExists.rowCount > 0){
            return response.sendStatus(409);
        }
        await database.query(`INSERT INTO games(name, image, "stockTotal", "categoryId","pricePerDay") VALUES ($1, $2, $3, $4, $5);`, 
        [name, image, Number(stockTotal), categoryId, Number(pricePerDay)]);
        response.sendStatus(201);
    } catch (error) {
        response.sendStatus(500);
    }
}

export async function getGames (request, response){
    try {
        const result = await database.query('SELECT * FROM games');
        response.send(result.rows)
    } catch (error) {
        response.sendStatus(500)
    }
}