import { Router } from 'express';

import { validateGame } from '../middlewares/gamesMiddleware.js'
import { postGame } from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.post('/games', validateGame, postGame);

export default gamesRouter;
