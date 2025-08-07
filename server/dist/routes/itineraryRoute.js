"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groqAPI_1 = require("../api/groqAPI");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Missing prompt' });
        }
        const itinerary = await (0, groqAPI_1.generateItineraryfromPrompt)(prompt);
        const parsed = JSON.parse(itinerary);
        res.status(200).json(parsed);
    }
    catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
});
exports.default = router;
