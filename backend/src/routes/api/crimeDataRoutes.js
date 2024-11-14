import { Router } from 'express';
import { crimeDataGroupedByYear, crimeDataGroupedByCrimeType, crimeDataGroupedByCrimeTypePieChart } from '../../controllers/crimeDataController.js';

const router = Router();
router.get("/byYear", crimeDataGroupedByYear);
router.get("/byCrimeType", crimeDataGroupedByCrimeType);
router.get("/byCrimeTypePie", crimeDataGroupedByCrimeTypePieChart);

export default router;