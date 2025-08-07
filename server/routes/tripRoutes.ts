import express from 'express';
import { getAllTrips, getTripById, createTrip } from '../controllers/tripController';

const router = express.Router();

router.get('/', getAllTrips);
router.get('/:id', getTripById);
router.post('/', createTrip);

export default router;