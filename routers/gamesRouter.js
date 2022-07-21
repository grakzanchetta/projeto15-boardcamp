import { Router } from 'express';

import { validateGame } from '../middlewares/gamesMiddleware.js'
import { postGame, getGames } from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.post('/games', validateGame, postGame);
gamesRouter.get('/games', getGames);

export default gamesRouter;
