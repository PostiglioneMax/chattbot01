import { Router } from 'express';
import { getLeagueStandings } from '../controllers/sportsController.js';

const router = Router();

router.get('/', getLeagueStandings);

export default router;
