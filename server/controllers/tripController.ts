import { Request, Response } from "express";
import  Trip from "../models/Trip";

// When someone POSTs to /trips , we create a new trip.
export const createTrip = async (req: Request, res: Response) => {
    try{
        const {title, prompt, activities, generatedItinerary}= req.body;

        if(!title || !prompt || !activities || !generatedItinerary){
            return res.status(400).json({error: "Missing required fields"});
        }
        const trip = await Trip.create({title, prompt, activities, generatedItinerary});
        res.status(201).json(trip);
    }

    catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to create trip"});
    }
};


// When someone GETs to /trips, we fetch all trips
export const getAllTrips = async (req: Request, res: Response) => {
    try{
        const trips = await Trip.find();
        res.status(200).json(trips);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to fetch trips"});
    }
};

// When someone GETs to /trips/:id, we fetch a specific trip

export const getTripById = async (req: Request, res: Response) => {
    try{
        const trip = await Trip.findById(req.params.id);
        if(!trip){
            return res.status(404).json({error: "Trip not found"});
        }
        res.status(200).json(trip);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to fetch trip"});
    }
}
