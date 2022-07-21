import database from '../dbstrategy/postgres.js';

export async function postCustomer (request, response){
    const { name, phone, cpf, birthday } = request.body;
    try {
        const customerExists = await database.query('SELECT id FROM customers WHERE cpf = $1', [cpf]);
        if(customerExists.rowCount > 0){
            return response.sendStatus(409);
        }
        await database.query(`INSERT INTO customers(name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, 
        [name, phone, cpf, birthday]);
        response.sendStatus(201);
    } catch (error) {
        response.status(500).send(error.message);
    }
}