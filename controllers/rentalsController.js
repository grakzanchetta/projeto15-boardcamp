import database from "../dbstrategy/postgres.js";

export async function postRent(request, response) {
    const rental = request.body;
    try {
      const customersResult = await database.query(`SELECT id FROM customers WHERE id = $1`, [rental.customerId]);
      if (customersResult.rowCount === 0) {
        return response.sendStatus(400);
      }
  
      const gameResult = await database.query(`SELECT * FROM games WHERE id=$1`,[rental.gameId]);
      if (gameResult.rowCount === 0) {
        return response.sendStatus(400);
      }
      const game = gameResult.rows[0];
  
      const result = await database.query(`SELECT id FROM rentals WHERE "gameId" = $1 AND "returnDate" IS null`, [rental.gameId]);
  
      if (result.rowCount > 0) {
        if (game.stockTotal === result.rowCount) {
          return response.sendStatus(400);
        }
      }
  
      const originalPrice = rental.daysRented * game.pricePerDay;
      await database.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice","delayFee") VALUES ($1, $2, NOW(), $3, null, $4, null);`, [rental.customerId, rental.gameId, rental.daysRented, originalPrice]);
      response.sendStatus(201);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }




































/*export async function postRent(request, response){
    const {customerId, gameId, daysRented} = request.body;

    try {
        const searchCustomer = await database.query(`SELECT id FROM customers WHERE id = $1`, [customerId]);
        if (searchCustomer.rowCount === 0){
            return response.sendStatus(400);
        }
    
        const searchGame = await database.query (`SELECT id FROM games WHERE id = $1`, [gameId]);
        if (searchGame.rowCount === 0){
            return response.sendStatus(400);
        }
    
        const game = searchGame.rows[0];
        const searchResult = await database.query(`SELECT id FROM rentals WHERE "gameId" = $1 AND "returnDate" IS null`, [gameId]);
        if (searchResult.rowCount > 0){
            if (game.stockTotal === searchResult.rowCount){
                return response.sendStatus(400);
            }
        }
    
        const originalPrice = daysRented * game.pricePerDay;
        await database.query (`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, NOW(), $3, null, $4, null);`, [customerId, gameId,daysRented,originalPrice]);
    
        response.sendStatus(201);
    } catch (error) {
        response.status(500).send(error.message);
    }
} */