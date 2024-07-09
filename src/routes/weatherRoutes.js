import { Router } from 'express';
import { getWeatherForLocation } from '../controllers/weatherController.js';

const router = Router();

router.get("/", getWeatherForLocation);

export default router;
