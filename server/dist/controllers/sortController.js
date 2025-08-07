"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
console.log("sort.ts sent to backend received");
const sortTrip = async (request, response) => {
    try {
        const { activities } = request.body;
        if (!activities) {
            console.log("Missing activities");
            return response.status(400).json({ error: "Missing required fields" });
        }
        console.log("Received activities");
        const prompt = `You are a travel planning assistant. Given a list of activities, sort them into a 3-day travel itinerary with time-based scheduling. Use this format:

{
  "Title": "Final Japan Itinerary",
  "Days": [
    {
      "Day": "Day 1",
      "Schedule": [
        {
          "time": "9:00 AM",
          "title": "Tokyo Skytree Visit",
          "location": "Tokyo",
          "notes": "Start the day with a panoramic view."
        },
        ...
      ]
    },
    ...
  ]
}

Activities:
${JSON.stringify(activities, null, 2)}`;
        const groqResponse = await axios_1.default.post("https://api.groq.com/openai/v1/chat/completions", {
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: "Sort this into a travel timeline and return in the exact format above. Only respond with valid JSON. No markdown, no explanations." }
            ],
            temperature: 0.7,
            max_tokens: 2048
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            }
        });
        console.log("groq response received");
        const parsed = JSON.parse(groqResponse.data.choices[0].message.content);
        response.status(200).json(parsed);
    }
    catch (error) {
        console.error("Error sorting trip:", error);
        return response.status(500).json({ error: "Failed to sort trip" });
    }
};
exports.default = sortTrip;
