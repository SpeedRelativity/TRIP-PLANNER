"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripById = exports.getAllTrips = exports.createTrip = void 0;
const Trip_1 = __importDefault(require("../models/Trip"));
// When someone POSTs to /trips , we create a new trip.
const createTrip = async (req, res) => {
    try {
        console.log("Creating trip");
        const { title, prompt, activities, generatedItinerary } = req.body;
        if (!title || !prompt || !activities || !generatedItinerary) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const trip = await Trip_1.default.create({ title, prompt, activities, generatedItinerary });
        res.status(201).json(trip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create trip" });
    }
};
exports.createTrip = createTrip;
// When someone GETs to /trips, we fetch all trips
const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip_1.default.find();
        res.status(200).json(trips);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch trips" });
    }
};
exports.getAllTrips = getAllTrips;
// When someone GETs to /trips/:id, we fetch a specific trip
const getTripById = async (req, res) => {
    try {
        const trip = await Trip_1.default.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }
        res.status(200).json(trip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch trip" });
    }
};
exports.getTripById = getTripById;
