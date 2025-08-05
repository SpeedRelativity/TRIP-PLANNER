import express from 'express';
import { getAllTrips, getTripById, createTrip } from '../controllers/tripController';

const router = express.Router();

router.get('/trips', getAllTrips);
router.get('/trips/:id', getTripById);
router.post('/trips', createTrip);

export default router;