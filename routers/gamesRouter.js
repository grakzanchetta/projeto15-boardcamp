import { Router } from 'express';

import { validateGame } from '../middlewares/gamesMiddleware.js'
import { postGames } from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.post('/games', validateGame, postGames);

export default gamesRouter;
