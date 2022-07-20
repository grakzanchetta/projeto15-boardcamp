import database from '../dbstrategy/postgres.js';

export async function postCategories (request, response){
    const { name } = request.body;
    try {
        const categoryExists = await database.query('SELECT id FROM categories WHERE name=$1', [name]);
        if(categoryExists.rowCount > 0){
            return response.sendStatus(409);
        }
        await database.query('INSERT INTO  categories(name) VALUES ($1)', [name]);
        response.sendStatus(201);
    } catch (error) {
        response.sendStatus(500);
    }
}

export async function getCategories (request, response){
    try {
        const result = await database.query('SELECT * FROM categories');
        response.send(result.rows)
    } catch (error) {
        response.sendStatus(500)
    }
}