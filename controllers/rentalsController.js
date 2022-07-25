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

export async function getRentals (request, response){
    const {customerId, gameId} = request.query;

    try {
        const parameters = [];
        const searchConditions = [];
        let searchQuery = '';

        if (customerId){
            parameters.push(customerId);
            searchConditions.push(`rentals."customerId" = $${parameters.length}`);
        }

        if (gameId){
            parameters.push(gameId);
            searchConditions.push(`rentals."gameId" = $${parameters.length}`);
        }

        if (parameters.length > 0){
            searchQuery += `WHERE ${searchConditions.join("AND")}`
        }

        const result = await database.query({
            text: `
              SELECT 
                rentals.*,
                customers.name AS customer,
                games.name,
                categories.*
              FROM rentals
                JOIN customers ON customers.id=rentals."customerId"
                JOIN games ON games.id=rentals."gameId"
                JOIN categories ON categories.id=games."categoryId"
              ${searchQuery}
            `,
            rowMode: "array"
        }, parameters);
        response.send(result.rows.map(createRentList));
    } catch (error) {
        response.sendStatus(500)
    }
}

function createRentList(row) {
    const [id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, customerName, gameName, categoryId, categoryName] = row;
  
    return {
      id,
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
      customer: {
        id: customerId,
        name: customerName
      },
      game: {
        id: gameId,
        name: gameName,
        categoryId,
        categoryName
      }
    }
  }

export async function finishRental(request, response){
    const { id } = request.params;

    try {
        const searchResult = await database.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (searchResult.rowCount === 0){
            return response.sendStatus(404);
        }

        const rental = searchResult.rows[0];
        if (rental.returnDate){
            return response.sendStatus(400);
        } else {
            const difference = new Date().getTime() - new Date(rental.rentDate).getTime();
            const differenceInDays = Math.floor(difference / (24 * 3600 * 1000));
        
        let delayFee = 0;
        if (differenceInDays > rental.daysRented){
            const addicionalDays = differenceInDays - rental.daysRented;
            delayFee = addicionalDays * rental.originalPrice;
        };

        await database.query(`UPDATE rentals SET "returnDate" = NOW(), "delayFee" = $1 WHERE id = $2`, [delayFee, id]);
        }
        response.sendStatus(200)

    } catch (error) {
        response.status(500).send(error.message)
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