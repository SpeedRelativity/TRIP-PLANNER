import express from 'express';
import { generateItineraryfromPrompt } from '../api/groqAPI';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Missing prompt' });
        }

        const itinerary = await generateItineraryfromPrompt(prompt);
        const parsed = JSON.parse(itinerary);

        res.status(200).json(parsed);

    } catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
});

export default router;


