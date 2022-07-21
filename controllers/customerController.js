import database from '../dbstrategy/postgres.js';

export async function postCustomer (request, response){
    const { name, phone, cpf, birthday } = request.body;
    try {
        const customerExists = await database.query('SELECT id FROM customers WHERE cpf = $1', [cpf]);
        if(customerExists.rowCount > 0){
            return response.sendStatus(409);
        }
        await database.query('INSERT INTO customers(name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', 
        [name, phone, cpf, birthday]);
        response.sendStatus(201);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

export async function updateCustomer (request, response){
    const { id } = request.params;
    const customer = request.body;
    
    if (isNaN(parseInt(id))) {
        return response.sendStatus(400);
    }
    try {
        const userExists = await database.query('SELECT id FROM customers WHERE cpf = $1 AND id != $2', [customer.cpf, id]);
        if (userExists.rowCount > 0) {
          return response.sendStatus(409);
        }
        await database.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5', [customer.name, customer.phone, customer.cpf, customer.birthday, id]);
        response.sendStatus(200);
      } catch (error) {
        response.status(500).send(error.message);
    }
}

export async function getCustomers (request, response){
    try {
        const result = await database.query('SELECT * FROM customers');
        response.send(result.rows)
    } catch (error) {
        response.sendStatus(500)
    }
}