import express from 'express';
import sortTrip from "../controllers/sortController";
const router = express.Router();
;

router.post('/', sortTrip);

export default router;
