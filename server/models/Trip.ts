import mongoose from "mongoose";
import { generateItineraryfromPrompt } from "../api/groqAPI";

const activitySchema = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true}
});

const tripSchema = new mongoose.Schema({
    title: {type: String, required: true},
    prompt: {type: String, required: true},
    activities: [activitySchema],
    generatedItinerary: {type: String, required: true},
    }, 
    {timestamps: true}
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;

