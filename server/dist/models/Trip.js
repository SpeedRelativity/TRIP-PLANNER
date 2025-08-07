"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true }
});
const tripSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    activities: [activitySchema],
    generatedItinerary: { type: String, required: true },
}, { timestamps: true });
const Trip = mongoose_1.default.model("Trip", tripSchema);
exports.default = Trip;
